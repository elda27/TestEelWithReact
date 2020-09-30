import * as React from 'react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import eelApi, { Response } from '../eel'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert';

// interface FormField {
//   text: string;
//   value: number;
//   targets: string[];
// }

interface State {
  text: string;
  value: number;
  c1: boolean;
  c2: boolean;
  c3: boolean;
  c4: boolean;

  submitFailed: boolean;
  error: boolean;
  errorMessage: string;
}

export class SettingPanel extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      text: '',
      value: 0,
      c1: true,
      c2: true,
      c3: true,
      c4: true,
      submitFailed: false,
      error: false,
      errorMessage: "",
    }
  }

  handleSubmit = () => {
    console.log('Update')
    const flags: string[] = []
    if (this.state.c1) { flags.push('C1'); }
    if (this.state.c2) { flags.push('C2'); }
    if (this.state.c3) { flags.push('C3'); }
    if (this.state.c4) { flags.push('C4'); }

    console.log(flags)
    eelApi.submit(
      this.state.text,
      this.state.value,
      flags,
    ).then((value: Response) => {
      if (!value.success) {
        this.displayMessage(value.message)
      }
    })
  };

  displayMessage(message: string) {
    this.setState({
      "error": true,
      "errorMessage": message,
    });
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Collapse in={this.state.error}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.setState({
                      "error": false
                    });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <Typography>{this.state.errorMessage}</Typography>
            </Alert>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Text field" margin="normal" required
            helperText={this.state.submitFailed ? "Any text required" : ""}
            error={this.state.submitFailed && this.state.text === undefined}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: event.target.value })}
            value={this.state.text}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Number field" type="number" margin="normal" required
            helperText={this.state.submitFailed ? "" : ""}
            error={this.state.submitFailed && this.state.value === undefined}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({ value: parseInt(event.target.value, 10) })}
            value={this.state.value}
            fullWidth
          />
        </Grid>

        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.c1}
                onChange={() => this.setState({ "c1": !this.state.c1 })}
              />
            }
            label="C1"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.c2}
                onChange={() => this.setState({ "c2": !this.state.c2 })}
              />
            }
            label="C2"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.c3}
                onChange={() => this.setState({ "c3": !this.state.c3 })}
              />
            }
            label="C3"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.c4}
                onChange={() => this.setState({ "c4": !this.state.c4 })}
              />
            }
            label="C4"
          />
        </Grid>

        <Grid item xs={3}>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Grid>

      </Grid>
    )
  }
}

export default SettingPanel