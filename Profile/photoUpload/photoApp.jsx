import React from 'react'
import { Image } from 'semantic-ui-react'




export default class ImageExampleCircular extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        this.firstView = this.firstView.bind(this);
        this.secondView = this.secondView.bind(this);
        this.getProfilePhoto = this.getProfilePhoto.bind(this);
        this.uploadedView = this.uploadedView.bind(this);
        this.againUploadedView = this.againUploadedView.bind(this);
        this.state = {
            profilePic: "",
            showPic: true,

            size: "",
            name: "",
            fileDetail: "",
            data: "",
            showUpload: false,



        }
    }

    componentDidMount() {
        this.getProfilePhoto();
    }

    getProfilePhoto() {
        $.ajax({
            url: '/Home/GetProfilePhoto',
            type: 'GET',
            dataType: 'json',
            success: (res) => {
                //console.log(res);
                this.setState({
                    data: res
                })
                
                console.log("getprofilephoto", this.state.data)
            }
        })

        let uploadProfilePic = this.state.data;
        (uploadProfilePic != null || uploadProfilePic != "") ? this.setState({ showUpload: true }) : this.setState({ showUpload: false });
    }



    handleChange(event) {

        let fileDetails = event.target.files[0]
        console.log("fileDetails", fileDetails);


        let x = new FileReader();
        x.readAsDataURL(event.target.files[0]);
        for (var i in fileDetails) {
            console.log("files", fileDetails[i])
        }

        x.onload = (event) => {
            //console.warn("img data", event.target.result)


            this.setState({

                profilePic: event.target.result,
                showPic: false,
                size: fileDetails.size,
                name: fileDetails.name,
                fileDetail: fileDetails


            })


        }

        
    }

    handleUpload(e) {
        e.preventDefault();
        //let data1 = { ImageSize: this.state.size, FileName: this.state.name, ImageData: this.state.profilePic };

        console.log("filedetails2", this.state.fileDetail)

        let data1 = new FormData();
        data1.append('file', this.state.fileDetail)

        console.log("data1", data1)
        $.ajax({
            type: 'POST',
            url: '/Home/UpdateProfilePhoto',
            data: data1,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: (res) => {
                //window.location.reload();
                console.log(res);

            }
        })


    }

    firstView() {
        return (
            <div>
                <input
                    style={{ display: 'none' }}
                    type="file"
                    
                    onChange={this.handleChange} ref={fileInput => this.fileInput = fileInput} />
                <span onClick={() => this.fileInput.click()}><i className="huge circular camera retro icon" /></span>
            </div>
        )
    }

    secondView() {
        return (
            <div>
                <img className="ui medium circular image " src={this.state.profilePic} />
                <div className="ui hidden divider"></div>
                <button onClick={this.handleUpload}>Upload</button>
            </div>
        )
    }

    uploadedView() {
        const { data } = this.state;
        return (
            <div>
                <input style={{ display: 'none' }} type="file" onChange={this.handleChange} ref={fileInput => this.fileInput = fileInput} />
                <img className="ui medium circular image " src={"/images/" + data} onClick={() => this.fileInput.click()} />
                
            </div>
        )
    }

    againUploadedView() {
        const { data, showPic } = this.state;
        return (
            <div>
                { showPic ? this.uploadedView(): this.secondView() }

            </div>
        )
    }



    render() {
        const { profilePic, showPic, showUpload } = this.state;
        return (
            <div>

                {showUpload ? this.againUploadedView() : showPic ? this.firstView() : this.secondView()}

                


            </div>
        )
    }
}

//{this.uploadedView()}
//{showUpload ? this.uploadedView(): showPic ? this.firstView() : this.secondView()}
//{showPic ? this.firstView() : this.secondView()}