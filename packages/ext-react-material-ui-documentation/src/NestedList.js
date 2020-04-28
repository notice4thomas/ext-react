import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
//import { getMenu } from './menudata'

class NestedList extends React.Component {
  state = {
    menuSelectedIndex: 0
  };

  handleClick = (name, key, type, reactname, component) => {
    this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
    this.props.onMenuClick(name, key, type, reactname, component)
  };

  handleRootClick = (name, key, type, reactname) => {
    this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
    this.props.onMenuClick(name, key, type, reactname, 'reactname')
  };

  handleMidClick = (name, key, type, reactname) => {
    this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
    this.props.onMenuClick(name, key, type, reactname, 'mid')
  };

  handleExampleClick = (name, key, type, reactname, component) => {
    this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
    this.props.onMenuClick(name, key, type, reactname, component)
  };

  render() {
    const menu = this.props.menu;
    const { menuSelectedIndex } = this.state;
    return (
      <div>
        <List>
          {menu.map((rootitem, index1) => {
            return (
              <div key={rootitem.id}>
                <ListItem button selected={menuSelectedIndex === (100*rootitem.id)} key={(100*rootitem.id)} onClick={this.handleRootClick.bind(this,rootitem.name,(100*rootitem.id),rootitem.type,rootitem.component,rootitem.title)}>
                  <ListItemText primary={<Typography style={{color: '#ffffff',fontSize:'18px' }}>{rootitem.title}</Typography>} />
                  {rootitem.count !== 0 &&
                  <ListItemAvatar>
                  <Avatar style={{height:'30px',width:'30px',color:'black',background:'white'}}>{rootitem.count}</Avatar>
                  </ListItemAvatar>
                  }
                  {this.state[rootitem.title] ? (<ExpandLess style={{fontWeight:'bold',color:'white'}}/>) : (<ExpandMore style={{fontWeight:'bold',color:'white'}}/>)}
                </ListItem>
                <Collapse key={rootitem.items.id} component="li" in={this.state[rootitem.title]} timeout="auto" unmountOnExit>
                <List>
                {rootitem.items.map((miditem, index2) =>
                  {
                    return (
                      <div key={miditem.id}>
                        <ListItem button selected={menuSelectedIndex === (100*rootitem.id)+(10*miditem.id)} key={(100*rootitem.id)+(10*miditem.id)} onClick={this.handleClick.bind(this,miditem.name,(100*rootitem.id)+(10*miditem.id),miditem.type,miditem.name,miditem.component)}>
                          <ListItemText primary={<Typography className="mid" >{miditem.title}</Typography>}/>
                          {miditem.items ? (this.state[miditem.title] ? (<ExpandLess style={{fontWeight:'bold',color:'white'}}/>) : (<ExpandMore style={{fontWeight:'bold',color:'white'}}/>)):(<div></div>)}
                        </ListItem>
                        {miditem.items ? (
                          <Collapse key={miditem.subitems.id} component="li" in={this.state[miditem.title]} timeout="auto" unmountOnExit>
                          <List>
                          {miditem.items.map((subitem, index3) => {
                            return (
                              <ListItem button selected={menuSelectedIndex === (100*rootitem.id)+(10*miditem.id+(1*subitem.id))} key={(100*rootitem.id)+(10*miditem.id)+(1*subitem.id)} onClick={this.handleExampleClick.bind(this,subitem.name,(100*rootitem.id)+(10*miditem.id)+(1*subitem.id),subitem.type,rootitem.name,subitem.component)}>
                                <ListItemText primary={<Typography className="example" >{subitem.title}</Typography>} />
                              </ListItem>
                            )
                          })}
                          </List>
                          </Collapse>
                          ): (<div></div>)
                        }
                      </div>
                    )
                  }
                )}
                </List>
                </Collapse>
                <Divider style={{background:'gray'}}/>
              </div>
            )
          })}
        </List>
      </div>
    );
  }

}
// NestedList.propTypes = {
//     classes: PropTypes.object.isRequired
// };
export default NestedList;
