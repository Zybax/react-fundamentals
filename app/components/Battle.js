import React from 'react';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview'
import { format } from 'path';
import ReactRouter, { Link } from 'react-router-dom';



// ----------------------------------------------------------

class PlayerInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username:''

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){

        const value = event.target.value;

        this.setState(() => {
            return{
                username:value
            }
        })

    }

    handleSubmit(event){
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }

    render(){
        return(
            <form 
            className ="column"
            onSubmit = {this.handleSubmit}
            >
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>

                <input
                id = "username"
                placeholder='github username'
                type="text"
                autoComplete='off'
                value={this.state.username}
                onChange={this.handleChange}
                />

                <button 
                className='button'
                type='submit'
                disabled={!this.state.username}
                >
                Submit
                </button>
          

            </form>
        )
    }

}

PlayerInput.PropTypes ={
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired

}


// ----------------------------------------------------------

class Battle extends React.Component {
    constructor(props){
        super(props);
        this.state={
            playerOneName:'',
            playerTwoName:'',
            playerOneImage:null,
            playerTwoImage:null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id,username){
        this.setState(()=>{
            const newState= {}
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/'+ username + '.png?size=200';
            return newState;
        })
    }


    handleReset(id){
        this.setState(()=>{
            const newState= {}
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        })

    }

    render(){
        const match = this.props.match;
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName;
        const playerOneImage = this.state.playerOneImage;
        const playerTwoImage = this.state.playerTwoImage;

        return (
            <div>
                <div className='row'>

                {/* Player One UI  */}
                    {!playerOneName && 
                    <PlayerInput
                    id='playerOne'
                    label='Player One'
                    onSubmit={this.handleSubmit} />}


                    {playerOneImage !== null &&
                    <PlayerPreview
                    avatar={playerOneImage}
                    username={playerOneName}
                    >

                     <button className='reset'
                        onClick={this.handleReset.bind(null,'playerOne')}>
                        Reset
                    </button> 

                    </PlayerPreview>
                    }

                    {/* Player Two UI */}
                    {!playerTwoName && 
                    <PlayerInput
                    id='playerTwo'
                    label='Player Two'
                    onSubmit={this.handleSubmit} />}

                    {playerTwoImage !== null &&
                    <PlayerPreview
                    avatar={playerTwoImage}
                    username={playerTwoName}
                    >

                    <button className='reset'
                        onClick={this.handleReset.bind(null,'playerTwo')}>
                        Reset
                    </button> 
                    </PlayerPreview>
                    }
                </div>

                {playerOneImage && playerTwoImage &&
                <Link className='button'
                to={{
                    
                    pathname: match.url +'/results',
                    search: `?playerOneName=` + playerOneName + 
                    '&playerTwoName='+ playerTwoName

                }}>
                Battle
                </Link>}
            </div>
        )
    }
}

export default Battle;
