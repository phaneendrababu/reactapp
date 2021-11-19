import React,{Component} from "react";
import { Navigate } from 'react-router-dom';
class Input extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            audioFile:[],
            navigate:null,
            uploadPercentage:0
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        console.log(event.target.files[0])
        this.setState({
            audioFile: event.target.files[0]
        })

        let reader=new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    }

    handleSubmit(event){

        /*let fileName=this.state.audioFile.name
        console.log(fileName)*/

        if(this.state.audioFile.length===0){
            alert("File Should Not be Empty")
            return false
        }
        event.preventDefault();
        this.setState({navigate: "/Output" })
    }

    render()
    {
        if (this.state.navigate) {
            console.log(this.state)
            return <Navigate to="/Output" state={this.state}/>
          }

        return(
            <div>
                <h1>Input</h1>
                <form className="text-center">
                    <div className="form-group">
                        <label for="exampleFormControlFile1">Upload File</label>
                        <input type="file" id="exampleFormControlFile1" onChange={this.handleChange}/>
                    </div>
                    <button type="submit" class="btn btn-primary mb-2" onClick={this.handleSubmit}>Submit</button>
                    {/*<p>{`Uploading ${this.state.uploadPercentage}%`}</p>*/}
                </form>
            </div>
        )
    }
}

export default Input;