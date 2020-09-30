import * as React from 'react';
import TabPanel from './ui/TabPannel'
import SettingPanel from './ui/SettingPanel'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface State {
  index: number;
}

export class Application extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      index: 0
    }
  }

  private handleTabChange = (_: React.ChangeEvent<{}>, newIndex: number) => {
    this.setState({
      index: newIndex
    });
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Tabs value={this.state.index} onChange={this.handleTabChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        <TabPanel visible={this.state.index === 0}>
          <SettingPanel />
        </TabPanel>
        <TabPanel visible={this.state.index === 1}>
          Item Two
        </TabPanel>
        <TabPanel visible={this.state.index === 2}>
          Item Three
        </TabPanel>
      </div>
    );
  }
}

export default Application;