import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import getCookieByName from '../utility/getCookie.js';

function withAuth(ComponentToProtect) {
    
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                loading: true,
                redirect: false
            };
        }

        componentDidMount() {
            const csrf_access_token = getCookieByName('csrf_access_token');
            fetch ('/validate_token', {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': csrf_access_token
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch (err => {
                    console.error(err);
                    this.setState({ loading: fasle, redirect: true });
                });
            )
        }

        render() {
            const {loading, redirect} = this.state;

            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to "/login" />;
            }
            return <ComponentToProtect {...this.props} /> 
        }
    }
}

export default withAuth;
