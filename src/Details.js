import React from "react";
import { navigate } from "@reach/router";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { connect } from "react-redux";
import Modal from "./Modal";

class Details extends React.Component {
    state = { loading: true, showModal: false };

    componentDidMount() {
        pet.animal(this.props.id)
        .then(({ animal }) => {
            this.setState({
                url: animal.url,
                name: animal.name,
                animal: animal.type,
                location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
                description: animal.description,
                media: animal.photos,
                breed: animal.breeds.primary,
                loading: false
            });
        }).catch(err => this.setState({ error:err }));
    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal });
    adopt = () => navigate(this.state.url);


    render() {
        if (this.state.loading) {
            return <h1> loading ... </h1>
        }
    
        const {animal, breed, location, media, description, name, showModal}  = this.state;

        return (
            <div className="details">
                <div>
                    <Carousel media={media} />
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${location}`}</h2>
                        <button style={{ backgroundColor: this.props.theme }}
                        onClick={this.toggleModal}>Adopt {name}</button>
                    <p>{description}</p>
                    {
                        showModal? (
                            <Modal>
                                <div>
                                    <h2>Would you like to adopt {name}?</h2>
                                    <div className="buttons">
                                        <button onClick={this.adopt}>Yes</button>
                                        <button onClick={this.toggleModal}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ theme }) => ({ theme });

const WrappedDetails = connect(mapStateToProps)(Details);

export default function DetailsErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <WrappedDetails {...props} />
        </ErrorBoundary>
    );
}
