import React, { Component, useState, useEffect } from "react";
import "./Card.css";
import { connect } from "react-redux";
import md5 from "md5";
import SEO from "../../components/SEO";

import { showPathEntries, entriesAreSame } from "../../utils/fileSystem";
import { FOLDER } from "../../utils/constants";
import { addEntry, deleteEntry, setEntry } from "../../actions/fileSystem";

import Icon from "../../components/Icon";
import Add from "../../components/Add";
import FolderIcon from "../../assets/img/folder-icon.png";
import {useTheme} from "../../contexts/themeContext"

// import FolderIcon from "../../assets/img/folder.png";
// class Card extends Component {
//   componentDidMount() {
//     console.log(this.props.fileSystem[md5("/SarvvidBox" + FOLDER)]);
//     console.log("Entry...", this.props.entry)
//     if (
//       !Object.keys(this.props.fileSystem).includes(
//         md5(this.props.location.pathname + FOLDER)
//       )
//     ) {
//       this.props.history.push("/");
//     }
//     console.log(this.props.entry);
//   }

//   componentDidUpdate() {
//     console.log(this.props.fileSystem[md5("/SarvvidBox" + FOLDER)]);
//     console.log("Entry...", this.props.entry)
//     if (
//       !Object.keys(this.props.fileSystem).includes(
//         md5(this.props.location.pathname + FOLDER)
//       )
//     ) {
//       this.props.history.push("/");
//     }
//     console.log(this.props.entry);
//   }

//   render() {
//     return (
      
//         this.props.entry[0] ? <div className="midPane_cards">
//         <SEO
//           url={this.props.match.url}
//           title={this.props.match.url}
//           image={FolderIcon}
//           description={this.props.match.url}
//         />

//         {this.props.entry.map((entry, _) => (
//           <Icon
//             entry={entry}
//             index={_}
//             key={`${entry.path}_${entry.type}`}
//             deleteFn={() => {
//               this.props.deleteEntry(md5(entry.path + entry.type));
//             }}
//             setEntry={(val) => this.props.setEntry(val)}
//           />
//         ))}
//       </div> : <div>hiii</div>
      
//     );
//   }
// }

const Card = (props) => {

  const [entryState, setEntryState] = useState(props.entry)
  const darkTheme = useTheme();

  


  useEffect(() => {
      console.log(props.fileSystem[md5("/SarvvidBox" + FOLDER)]);
      console.log("Entry...", props.entry)
      if (
        !Object.keys(props.fileSystem).includes(
          md5(props.location.pathname + FOLDER)
        )
      ) {
        props.history.push("/");
      }
      console.log(props.entry);

     
  }, [entryState, props.entry])

  // setTimeout(() => {
  //   window.location.reload()
  // }, 2000)

  


  return (
      
            props.entry[0] ? 
          <div className="midPane_cards" style = {{background: `${darkTheme ? "#121212" : "#fff"}` }} >
            
            <SEO
              url={props.match.url}
              title={props.match.url}
              image={FolderIcon}
              description={props.match.url}
              
            />
            
            
            {props.entry.map((entry, _) => (
              <Icon
                entry={entry}
                index={_}
                key={`${entry.path}_${entry.type}`}
                deleteFn={() => {
                  props.deleteEntry(md5(entry.path + entry.type));
                }}
                setEntry={(val) => props.setEntry(val)}
              />
            ))}
          </div> : <div>hiii</div>
          
        );
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.url);
  const path = ownProps.match.url;
  console.log(state.fileSystem);

  return {
    entry: state.fileSystem[md5(path + FOLDER)]
      ? state.fileSystem[md5(path + FOLDER)].children.map(
          (childrenID) => state.fileSystem[childrenID]
        )
      : [],
    fileSystem: state.fileSystem,
  };
};

export default connect(mapStateToProps, { addEntry, deleteEntry, setEntry })(
  Card
);
