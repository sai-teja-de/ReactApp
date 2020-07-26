import React, { Component, ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
    public state= { hasError: false, redirect: false};

    public static getDerivedStateFromError() {
        return { hasError: true};
    }

    public componentDidCatch(error: Error, info: ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error("ErrorBoundary caught an error", error, info);
    }

    public componentDidUpdate() {
        if(this.state.hasError) {
            setTimeout(() => this.setState({ redirect:true}), 5000);
        }
    }

    public render() {
        if(this.state.redirect) {
            return <Redirect to="/" noThrow />;
        }
        if(this.state.hasError) {
            return (
                <h1>
                    There was an error with this listing. <Link to="/">Click Me!</Link>
                    to get back to the homepage or wait 5secs
                </h1>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;