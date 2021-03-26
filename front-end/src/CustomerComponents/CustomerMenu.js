import React from 'react';
import TableRow from './TableRow';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import * as Yup from 'yup';
import Error from '../components/Error';

const validationSchema = Yup.object().shape({
  contact: Yup.string()
    .email('Must be a valid email address')
    .required('Email cannot be empty'),
  firstName: Yup.string().required('First Name cannot be empty'),
  lastName: Yup.string().required('Last Name cannot be empty'),
});

class CustomerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tableDataisFetched: false };
  }

  getOrder() {
    let order = {};
    for (let key in this.state) {
      order[key] = this.state[key];
    }
    let orderJSON = {
      order: order,
      cartID: this.props.cartID,
      userID: 2,
    };
    return orderJSON;
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/customer/${this.props.cartID}`)
      .then((response) => {
        if (response.ok) {
          return response;
        }
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState(
          { apiData: json.data, tableDataisFetched: true },
          this.initializeMenuQuantity
        );
      });
  };

  initializeMenuQuantity() {
    this.state.apiData.map((item) => {
      this.setState({ [item.ITEM_ID]: 0 });
    });
  }

  updateQuantities = (data) => this.setState({ [data.ITEM_ID]: data.quantity });

  renderItems() {
    let output = (
      <tr>
        <td>'Loading...'</td>
      </tr>
    );
    if (this.state.tableDataisFetched) {
      output = this.state.apiData.map((item) => {
        return (
          <TableRow
            key={item.ITEM_ID}
            item={item.ITEM_ID}
            name={item.ITEM_NAME}
            description={item.DESCRIPTION_ITEM}
            price={`$${item.PRICE / 100}`}
            quantity={this.state[item.ITEM_ID]}
            onChange={this.updateQuantities.bind(this)}
          />
        );
      });
    }
    return <tbody>{output}</tbody>;
  }

  getForm() {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          firstName: '',
          lastName: '',
          contact: '',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          let orderInfo = this.getOrder();
          for (const key in values) {
            orderInfo[key] = values[key];
          }

          // submit order to back-end
          fetch(`${process.env.REACT_APP_SERVER_URL}/customer/order/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderInfo),
          });

          // provide user confirmation of order submission
          alert('Order Submitted, Thank you');

          // refresh page
          window.location.reload();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="two fields">
              <div
                className={`field ${
                  touched.firstName && errors.firstName ? `error` : null
                }`}
              >
                <label htmlFor="firstName">First Name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
                <Error touched={touched.firstName} message={errors.firstName} />
              </div>

              <div
                className={`field ${
                  touched.lastName && errors.lastName ? `error` : null
                }`}
              >
                <label htmlFor="lastName">Last Name</label>
                <Field id="lastName" name="lastName" placeholder="Last Name" />
                <Error touched={touched.lastName} message={errors.lastName} />
              </div>
            </div>

            <div
              className={`field ${
                touched.contact && errors.contact ? `error` : null
              }`}
            >
              <label htmlFor="contact">Contact</label>
              <Field
                id="contact"
                name="contact"
                placeholder="Valid e-mail required"
                type="text"
              />
              <Error touched={touched.contact} message={errors.contact} />
            </div>
            <button
              type="submit"
              className="ui medium green button"
              style={{ marginBottom: '5vh' }}
              disabled={
                errors.firstName ||
                errors.lastName ||
                errors.contact ||
                !touched.firstName ||
                !touched.lastName ||
                !touched.contact
              }
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    );
  }

  render() {
    return (
      <Container>
        <div>
          <Link to={`/customer/map`}>
            <button className="large ui blue button">Return to Map</button>
          </Link>
          <Link to={`/`}>
            <button className="large ui blue button">Return to Home</button>
          </Link>
          <h1>Menu</h1>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Add</th>
                <th>Remove</th>
                <th>Quantity</th>
              </tr>
            </thead>
            {this.renderItems()}
          </table>
          <h1>Order Submission</h1>
          {this.getForm()}
        </div>
      </Container>
    );
  }
}

export default CustomerMenu;
