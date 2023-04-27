import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import contract from '../../contracts/contract';

class NewConf extends Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    this.props.updateForm(name, value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, detail, limitation } = this.props.form;
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const result = await contract.methods.newConference(title, detail, limitation)
        .send({ from: accounts[0] });
      console.log(result);
      this.props.submitForm();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { title, detail, limitation } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <input
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            placeholder="Detail"
            name="detail"
            value={detail}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            placeholder="Limitation"
            name="limitation"
            value={limitation}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    form: state.newconf,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateForm: (field, value) => {
      dispatch({
        type: 'newconf_update_form',
        field,
        value,
      });
    },
    submitForm: () => {
      dispatch({
        type: 'submit_newconf',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewConf);