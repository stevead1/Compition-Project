/* Photo upload section */
import React, { Component } from 'react';
import ImageExampleCircular from './photoUpload/photoApp.jsx';
//import ButtonExampleEmphasisShorthand from './test.jsx';

export default class PhotoUpload extends Component {
    render() {
        return (


            <div className="row">
                <div className="four wide column">
                    <h3 className="alt" data-hint="">Profile Photo</h3>

                    <div className="tooltip">Add you profile picture here.</div>
                </div>
                <div className="four wide column">
                    <ImageExampleCircular />

                </div>
            </div>
        )
    }
}
