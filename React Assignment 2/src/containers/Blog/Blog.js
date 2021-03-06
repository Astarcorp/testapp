import React, { Component } from 'react';
import { Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from './Posts/Posts';
import FullPost from './FullPost/FullPost';
import NewPost from './NewPost/NewPost';
import axios from 'axios';
import classes from './Blog.module.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import DataTableFilterDemo from '../../components/DataTableFilterDemo';
import DataTableCrudDemo from '../../components/DataTableCrudDemo';
import Logo from '../../assets/logo512.png';
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';

import classes2 from './Calendar.module.css';
import './Upload.css';

class Blog extends Component {
    state = {
        date: '',
        file: '',
        msg: '',
        selectedCountry: '',
        filteredCountries: []
    }

    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    uploadFileData = (event) => {
        //event.preventDefault();
        this.setState({ msg: '' });

        let data = new FormData();
        data.append('file', this.state.file);
        console.log(this.state.file);
        /*
        fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: data
        }).then(response => {
            this.setState({ msg: "File successfully uploaded" });
        }).catch(err => {
            this.setState({ error: err });
        });
        */
        axios.post('http://localhost:8080/upload', data)
            .then(response => {
                //handle success
                this.setState({ msg: "File successfully uploaded" });
            })
            .catch(err => {
                //handle error
                this.setState({ error: err });
            });
        /*
        axios({
            method: 'post',
            url: 'http://localhost:8080/upload',
            data: data,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            //handle success
            this.setState({ msg: "File successfully uploaded" });
        }).catch(err => {
            //handle error
            this.setState({ error: err });
        });
        */
    }

    myUploader = (event) => {
        //event.files == files to upload
    }

    searchCountry = () => {
        if (this.state.selectedCountry.trim()) { //theres something in form
            var split = this.state.selectedCountry.split(","); //split
            var selectLast = split[split.length - 1]; //get last
            var trimLast = selectLast.trim(); //trim

            if (trimLast && trimLast.length >= 2) { //theres something in form
                this.setState({ filteredCountries: ["aaa", "bbb", "ccc"] });
            }
        }
    }

    addOnToSearch = (value) => {
        if (this.state.selectedCountry.split(",").length >= 2) { //more than 2 then add on
            var split = this.state.selectedCountry.split(',');
            split.pop(); //remove last
            split.push(value); //add new value
            this.setState({ selectedCountry: split.join(",") + "," });
        } else {
            this.setState({ selectedCountry: value + "," })
        }
    }

    render() {
        return (
            <div className={classes.Blog}>
                <h1 style={{ position: 'sticky', top: '0' }}>File Upload Example using React</h1>
                <a href="/">
                    <img src={Logo} style={{ position: 'sticky', top: '2em', width: '100%', height: "150px" }} />
                </a>
                <Calendar
                    value={this.state.date}
                    appendTo={document.body}
                    onChange={(e) => this.setState({ date: e.value })}>
                </Calendar>
                <h3>Upload a File</h3>
                <h4>{this.state.msg}</h4>
                <input onChange={this.onFileChange} type="file"></input>
                <button disabled={!this.state.file} onClick={this.uploadFileData}>Upload</button>
                <FileUpload name="file" url="http://localhost:8080/upload" customUpload uploadHandler={this.uploadFileData} mode="basic" />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jim</td>
                            <td>00001</td>
                            <td>Blue</td>
                        </tr>
                        <tr>
                            <td>Sue</td>
                            <td>00002</td>
                            <td>Red</td>
                        </tr>
                        <tr>
                            <td>Barb</td>
                            <td>00003</td>
                            <td>Green</td>
                        </tr>
                    </tbody>
                </table>
                <Editor />
                <Dropdown />
                <div class="ui-grid">
                    <div class="ui-grid-col-4">Col1</div>
                    <div class="ui-grid-col-4">Col2
                        </div>
                    <div class="ui-grid-col-4">Col2</div>
                </div>

                <div className="p-d-flex">Flex Container</div>
                <div className="p-d-inline-flex">Inline Flex Container</div>

                <div className="p-d-flex p-flex-column">
                    <div className="p-mt-2">Item 1</div>
                    <div className="p-mb-2">Item 2</div>
                    <div>Item 3</div>
                </div>

                <div className="p-d-flex p-flex-column p-flex-md-row">
                    <div className="p-mb-2 p-mr-2">Item 1</div>
                    <div className="p-mb-2 p-mr-2">Item 2
                        <Calendar
                            value={this.state.date}
                            appendTo={document.body}
                            onChange={(e) => this.setState({ date: e.value })}>
                        </Calendar>
                    </div>
                    <div className="p-mb-2 p-mr-2">Item 3</div>
                </div>

                <div className="p-d-flex">
                    <div className="p-mr-2 p-order-3">Item 1</div>
                    <div className="p-mr-2 p-order-1">Item 2</div>
                    <div className="p-mr-2 p-order-2">Item 3</div>
                </div>

                <div className="p-d-flex">
                    <div className="p-mr-2 p-order-3 p-order-md-2">Item 1</div>
                    <div className="p-mr-2 p-order-1 p-order-md-3">Item 2</div>
                    <div className="p-mr-2 p-order-2 p-order-md-1">Item 3</div>
                </div>

                <div className="p-grid p-jc-center">
                    <div className="p-d-flex p-jc-around p-col-3 p-m-2" style={{ backgroundColor: "#DAA520" }}>
                        <div>Item 1</div>
                        <div>Item 2</div>
                    </div>

                    <div className="p-d-flex p-col-3 p-m-2" style={{ border: "1px solid red" }}>
                        <div>Item 1</div>
                        <div>Item 2</div>
                    </div>

                    <div className="p-d-flex p-col-3 p-m-2" style={{ border: "1px solid red" }}>
                        <div>Item 1</div>
                        <div>Item 2</div>
                    </div>
                </div>

                <div className="p-d-flex p-ai-center">
                    <div className="p-mr-2" style={{ height: '100px', border: "1px solid red" }}>Item 1</div>
                    <div style={{ height: '50px', border: "1px solid red" }}>Item 2</div>
                </div>

                <div className="p-d-flex p-p-5 card">
                    <Button type="Button" icon="pi pi-check" className="p-mr-2" />
                    <div>hello</div>
                    <Button type="Button" icon="pi pi-search" className="p-ml-auto p-button-help" />
                </div>

                <div style={{ width: '10rem' }}>Long text wraps and does not overlow.</div>
                <div className="p-text-nowrap" style={{ width: '10rem' }}>Long text does not wrap and overflows the parent.</div>
                <div className="p-text-nowrap p-text-truncate" style={{ width: '10rem' }}>Long text does not wrap and overflows the parent.</div>

                <img src={Logo} alt="Logo" style={{ height: "30px", width: "30px" }} />
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts/" exact>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/new-post" exact component={NewPost} />
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>Not Found</h1>} />
                    <Redirect from="/" to="/posts" />
                </Switch>
                <Button label="Save" onClick="" />
                <AutoComplete
                    value={this.state.selectedCountry}
                    suggestions={this.state.filteredCountries}
                    completeMethod={this.searchCountry}
                    onSelect={(e) => this.addOnToSearch(e.value)}
                    onChange={(e) => this.setState({ selectedCountry: e.value })}
                    delay={1000}
                />
                <InputText />
                <h5>Vertical Alignment - Stretch</h5>
                <div className="p-grid p-align-stretch vertical-container">
                    <div className="p-col-3">
                        <div className={classes.Box} style={{ backgroundColor: 'red' }}>4</div>
                    </div>
                    <div className="p-col-6">
                        <div className={classes.Box} style={{ backgroundColor: 'blue' }}>
                            <p>sDataTableCrudDeDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogDataTableCrudDemogmogs</p>
                            <p>asd</p>
                            <p>fffd</p>
                            <p>dss</p>
                            <p>aaataTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemogtaTableCrudDeDataTableCrudDemog</p>
                        </div>
                    </div>
                    <div className="p-col-3">
                        <div className={classes.Box} style={{ backgroundColor: 'green' }}>4</div>
                    </div>
                </div>
                <i className="pi pi-check p-mr-2"></i>
            </div>
        );
    }
}

export default Blog;