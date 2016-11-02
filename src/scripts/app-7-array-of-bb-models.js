const ReactDOM = require('react-dom');
const React = require('react');
const Backbone = require('backbone');

let ShoutOutModel = Backbone.Model.extend({})

const HomeView = React.createClass({

   //
   getInitialState: function(){
      let defaultMod = new ShoutOutModel()
      let mod2 = new ShoutOutModel()

      let modAttributes = {
         msg: "HELLOOO HOW ARE YOU????",
         imgLink: "https://debragettlemanrak.files.wordpress.com/2011/04/angrykid.jpg",
         from: "Billy"
      }

      let modAtributes2 = {
         msg: "React seemed great but now it is making me so sad",
         from: 'TIY CHS Sep-2016',
         imgLink: "http://2.bp.blogspot.com/-Iaqmr6Y72fg/UhacXxZIKFI/AAAAAAAAAsA/P3CpMxA7_LM/s1600/sad-banana-2.jpg"
      }

      defaultMod.set(modAttributes)
      mod2.set(modAtributes2)

      let modelsListArray = []
      modelsListArray.push(defaultMod)
      modelsListArray.push(mod2)

      this.startingStateObj = {
         previewImgUrl: 'http://www.allensguide.com/img/no_image_selected.gif',
         shoutOutData : modelsListArray
      }

      return this.startingStateObj
   },

   _handleImgPreviewClick: function(){
      console.log('button CLICKED!!!!!')
      console.log('img input val', this.refs.imgInputEl.value)
      let currentImgInput = this.refs.imgInputEl.value
      let newStateObj = {}

      if( currentImgInput.length  > 0   ) {
         newStateObj = { previewImgUrl: currentImgInput }
      } else {
         newStateObj = this.startingStateObj
      }
      this.setState(newStateObj)
   },

   _addSubmission: function(){
      let theMsg = this.refs.theMsgEl.value
      let msgFrom = this.refs.msgFromEl.value
      let theImg = this.refs.imgInputEl.value

      let modAttributes = {
         msg: theMsg,
         imgLink: theImg,
         from: msgFrom
      }

      let newMod = new ShoutOutModel()
      newMod.set(modAttributes)

      //BAD! this.state.shoutOutData.push(newMod)
      let copyOfShoutList = this.state.shoutOutData.map(function(m){return m })
      copyOfShoutList.push(newMod)

      //triggers the `.render()` method with new state value
      let newStateObj = {shoutOutData: copyOfShoutList}
      this.setState(newStateObj)
   },

   render: function(){

      return (
         <div className="container">
            <h1>Shout Outs</h1>
            <div className="row">
               <div className="col-sm-4 new-shoutout">
                     <h3>Your Message</h3>
                     <input type="text" className="form-control"  ref="theMsgEl"/>

                     <hr/>

                     <h4>Message From </h4>
                     <input type="text" className="form-control" ref="msgFromEl"/>

                     <hr/>

                     <h4>Add Image</h4>

                     <input type="text" className="form-control" ref="imgInputEl"/>
                     <button className="btn btn-block btn-default btn-warning btn-sm" onClick={this._handleImgPreviewClick} >Add Image</button>

                     <br/>

                     <div href="#" className="thumbnail">
                           <img src={this.state.previewImgUrl} alt="no image found"/>
                     </div>
                     <br/>
                     <button className="btn btn-block btn-success btn-lg" onClick={this._addSubmission}>+</button>
               </div>

               <ShoutOutList shoutData={ this.state.shoutOutData }/>

            </div>

         </div>
      )
   }
})


const ShoutOutList = React.createClass({
   render: function(){
      let arrayOfShoutOutJSX = this.props.shoutData.map(function(smod){
         console.log(smod)
         return (
            <ShoutItem shoutModl={smod} key={smod.cid}/>
         )
      })

      return (
         <div className="col-sm-8">
            <h2>¡Shout Outs!</h2>
            <div className="shoutout">

               {arrayOfShoutOutJSX}

            </div>
         </div>

      )
   }
})

const ShoutItem = React.createClass({
   render: function(){
      return (
         <blockquote  style={{background: 'indianred', color: '#fff', padding: '4rem'}}>
            <p>{this.props.shoutModl.get('msg')}</p>
            <img src={this.props.shoutModl.get('imgLink')} alt="..."/>
            <cite>{this.props.shoutModl.get('from')}</cite>
         </blockquote>
      )
   }
})


ReactDOM.render(<HomeView/>, document.querySelector('#app-container'))
