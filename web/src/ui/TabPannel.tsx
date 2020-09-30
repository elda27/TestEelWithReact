import * as React from 'react';

interface Props {
  visible: boolean
}

export class TabPanel extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <div hidden={!this.props.visible}>
        {this.props.children}
      </div>
    );
  }
}

export default TabPanel