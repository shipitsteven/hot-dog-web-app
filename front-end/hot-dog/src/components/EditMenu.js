import React from 'react';
import AdminMain from './AdminMain';
import Box from './Box';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import Error from './Error';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const validationSchema = Yup.object().shape();

class EditMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      formSuccess: false,
      resMessage: '',
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    let id = this.props.match.params.id;
    if (!isNaN(id)) {
      fetch(`http://localhost:5000/admin/menu/edit/${id}`)
        .then((res) => res.json())
        .then((res) =>
          this.setState({ apiResponse: res }, this.genCurrentItemOptions)
        )
        .catch((error) => console.log(error));
      // } else if (this.props.match.url === '/admin/carts/new') {
      //   fetch(`http://localhost:5000/admin/carts/new`)
      //     .then((res) => res.json())
      //     .then((res) => this.setState({ apiResponse: res }))
      //     .catch((error) => console.log(error));
      // }
    }
  }

  genCurrentItemOptions() {
    if (this.state.apiResponse.onMenu.length > 0) {
      this.setState({
        onMenu: this.state.apiResponse.onMenu.map((item) => {
          return { value: item.Item_ID, label: item.Item_Name };
        }),
        offMenu: this.state.apiResponse.offMenu.map((item) => {
          return { value: item.Item_ID, label: item.Item_Name };
        }),
      });
    }
  }

  getInitializedTitle() {
    const { menuInfo } = this.state.apiResponse;
    if (menuInfo !== undefined) {
      return menuInfo.MENU_TITLE;
    }
  }

  getInitDescription() {
    if (this.state.apiResponse.menuInfo !== undefined) {
      return this.state.apiResponse.menuInfo.DESCRIPTION_MENU;
    }
  }

  render() {
    return (
      <AdminMain>
        <Box>
          <h1 className="ui header">
            <img src="/images/menu.svg" alt="menu icon"></img>
            Menu
          </h1>
          <Link to="/admin/menu">
            <button className="ui button">Back to menus</button>
          </Link>

          <div
            className={`ui success message ${
              this.state.formSuccess ? null : `hidden`
            }`}
          >
            <h4 className="header">{this.state.resMessage}</h4>
          </div>

          <Formik
            initialValues={{
              addItems: [],
              removeItems: [],
              title: this.getInitializedTitle() || '',
              description: this.getInitDescription() || '',
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              this.sendRequest(values);
              resetForm();
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <form className={`ui form`} onSubmit={handleSubmit}>
                {`Debug message: ${JSON.stringify(values)}`}
                <h3 className="ui centered dividing header">
                  {this.props.match.params.id
                    ? `Editing Menu ID - ${this.props.match.params.id}`
                    : 'Creating New Item'}
                </h3>

                <div className="field">
                  <label htmlFor="title">Title</label>
                  <Field as="input" type="text" name="title"></Field>
                </div>
                <div className="field">
                  <label htmlFor="description">Description</label>
                  <Field
                    as="input"
                    type="text"
                    name="description"
                    value={values.description}
                  ></Field>
                </div>

                <div className="two fields">
                  <div
                    className={`field ${
                      touched.menuID && errors.menuID ? `error` : null
                    }`}
                  >
                    <label>Remove Item</label>
                    <Select
                      isMulti
                      name="removeItems"
                      options={this.state.onMenu}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(evt) => {
                        setFieldValue(
                          'removeItems',
                          evt.map((item) => item.value)
                        );
                      }}
                    />
                    <Error touched={touched.menuID} message={errors.menuID} />
                  </div>
                  <div className="field">
                    <label>Add Item</label>
                    <Select
                      isMulti
                      name="addItems"
                      options={this.state.offMenu}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(evt) => {
                        setFieldValue(
                          'addItems',
                          evt.map((item) => item.value)
                        );
                      }}
                    />
                  </div>
                </div>
                <button
                  className="ui large green button"
                  type="submit"
                  disabled={false}
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </Box>
      </AdminMain>
    );
  }
}

export default EditMenu;