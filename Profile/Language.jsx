/* Language section */
import React from 'react';
import { Button, Form, Input, Label, Icon, Table } from 'semantic-ui-react'
//import ButtonExampleEmphasisShorthand from './test.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.saveSubmit = this.saveSubmit.bind(this);
        this.getLanguages = this.getLanguages.bind(this);
        this.showAdd = this.showAdd.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderDropdown = this.renderDropdown.bind(this);
        this.renderDropdownEdit = this.renderDropdownEdit.bind(this);
        this.editSubmit = this.editSubmit.bind(this);

        this.state = {
            //languageName: "",
            //levelType: "",
            visible: false,
            Language: "",
            LanguageLevel: "",
            editLangugae: true,
            editKey: "",
            editlanguagevalue: "",
            languageTest: "",
            levelTest: "",
            data: [],
            
                
        }
    }

    componentDidMount() {
        this.getLanguages();
    }

    getLanguages() {
        $.ajax({
            url: '/Home/GetLanguages',
            type: 'GET',
            dataType: 'json',
            success: (res) => {
                //console.log(res);
                this.setState({
                    data: res
                })
            }
        })
    }


    
    editItem(x) {
        //console.log("click");
        //console.log(x);
        let z = (this.state.data.filter((item) => { return (item.PersonLanguageId == x) })).map((i) => { return i.Language });
        //console.log(String(z[0]));
        this.setState({
            editLangugae: false,
            editKey: x,
            languageTest: String(z[0]),
           


        }
            , () => console.log("2", this.state.languageTest));
        console.log("hey");
        

    }

    editSubmit() {
        //e.preventDefault();

        let data1 = { PersonId: this.state.editKey, LanguageLevel: this.state.levelTest, Language: this.state.languageTest };
        console.log(data1);

        $.ajax({
            type: 'POST',
            url: '/Home/EditLanguage',
            data: data1,
            dataType: 'json',
            success: () => {
                window.location.reload();;
                
            }
        })
       
       
    }



    deleteItem(x) {
        //e.preventDefault();
        console.log("delete button is called");
        console.log(x);
        $.ajax({
            type: 'POST',
            url: '/Home/DeleteLanguage',
            data: { Id: x },
            dataType: 'json',
            success: () => {
                window.location.reload();;


            }
        })
    }

    cancelForm(event) {
        event.preventDefault();
        this.setState({
            Language: "",
            LanguageLevel: "",
            visible: false
        })
    }


    handleChange(event) {
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value })
    };

    showAdd(event) {
        event.preventDefault();
        this.setState({
            visible: true
        })
    }

    //saveSubmit(event) {
    //    //event.preventDefault();
    //    let data = { LanguageLevel: this.state.levelType, Language: this.state.languageName};
    //    //console.log(this.state);
    //    console.log(data);
    //    debugger;
    //    $.ajax({
    //        type: 'POST',
    //        url: '/Home/AddLanguage',
    //        data: JSON.stringify(data),
    //        contentType: 'application/json',
    //        dataType: 'json',
    //        success: () => {
    //            window.location.reload();

    //        }
    //    })
    //}

    saveSubmit(event) {
        console.log(this.state)
        $.ajax({
            type: 'POST',
            url: '/Home/AddLanguage',
            data: this.state,
            dataType: 'json',
            success: () => {
                var k = true;


            }
        })

    }

    renderDropdown() {
        return (
            <select className="ui dropdown" value={this.state.LanguageLevel} name="LanguageLevel" onChange={this.handleChange} placeholder="I can work">
                <option >Basic</option>
                <option>Conversational</option>
                <option>Fluent</option>
                <option>Native/Bilingual</option>
            </select>
        )
    }

    renderDropdownEdit() {
        return (
            <select className="ui dropdown" value={this.state.levelTest} name="levelTest" onChange={this.handleChange} placeholder="I can work">
                <option >Basic</option>
                <option>Conversational</option>
                <option>Fluent</option>
                <option>Native/Bilingual</option>
            </select>
        )
    }



    renderForm() {
        return (
            <form className="ui equal width form" onSubmit={this.saveSubmit} >

                <div className="fields">

                    <div className="field">
                        <input name="Language" value={this.state.Language} onChange={this.handleChange} placeholder="Add Language" type="text" />
                    </div>

                    <div className="field">
                        {this.renderDropdown()}
                    </div>

                    <div className="field">
                        <button className="ui blue button" type="submit" >Add</button>
                        <button className="ui grey button" onClick={this.cancelForm}>Cancel</button>
                    </div>
                </div>

            </form>

        )
    }



    render() {
        const { editLangugae, editKey, editlanguagevalue, languageTest} = this.state;
        let languagelist = this.state.data.map((item) => {
            return (

                editLangugae ?
                    <tr key={item.PersonLanguageId}>

                        <td> {item.Language} </td>
                        <td className="center aligned">{item.LanguageLevel} </td>
                        <td className="right aligned">
                            <span onClick={() => this.deleteItem(item.PersonLanguageId)}><i className="x icon" /></span>
                            <span onClick={() => this.editItem(item.PersonLanguageId)}><i className="pencil icon" /></span>
                            
                        </td>

                    </tr> :

                    (item.PersonLanguageId === editKey) ?

                        <tr key={editKey} >

                            <td> <input name="languageTest" value={languageTest} onChange={this.handleChange} /> </td>
                            <td className="center aligned">  {this.renderDropdownEdit()} </td>
                            <td className="right aligned">
                                <span onClick={this.editSubmit}><i className="check icon" /></span>
                            </td>

                        </tr> :

                        <tr key={item.PersonLanguageId}>

                            <td> {item.Language} </td>
                            <td className="center aligned">{item.LanguageLevel} </td>
                            <td className="right aligned">
                                <span onClick={() => this.deleteItem(item.PersonLanguageId)}><i className="x icon" /></span>
                                <span onClick={() => this.editItem(item.PersonLanguageId)}><i className="pencil icon" /></span>
                            </td>

                        </tr>



            )
        });


        return (

            <div className="row">
                <div className="four wide column">
                    <h3 className="alt" data-hint="">Languages</h3>
                    <p>How many languages do you speak?</p>
                    <div className="tooltip">Add languages you speak?.</div>
                </div>


                <div className="twelve wide field">
                    <div className="ui segment">
                        {this.state.visible ? this.renderForm() : null}



                        <table className="ui unstackable  table">
                            <thead>
                                <tr>

                                    <th>Language</th>
                                    <th className="center aligned">Level</th>
                                    <th className="right aligned"><button className="ui facebook button" onClick={this.showAdd}>
                                        <i className="plus icon"></i>

                                        Add New
                                        </button>
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {languagelist}
                            </tbody>

                        </table>

                        

                    </div>
                </div>
            </div>

        )
    }
}


//<ButtonExampleEmphasisShorthand />



