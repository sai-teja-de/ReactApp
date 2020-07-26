import React, { lazy } from "react";
import { navigate, RouteComponentProps } from "@reach/router";
import pet, { Photo, AnimalResponse } from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

const Modal = lazy(() => import("./Modal"));

class Details extends React.Component <RouteComponentProps<{ id: string}>>{
    public state = { 
        loading: true,
        showModal: false,
        name: "",
        animal: "",
        location: "",
        description: "",
        media: [] as Photo[],
        url: "",
        breed: "" 
    };

    public componentDidMount() {
        if(!this.props.id) {
            navigate("/");
            return;
        }
        pet.animal(+this.props.id)
        .then(({ animal }:AnimalResponse) => {
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
        }).catch((err: Error) => this.setState({ error:err }));
    }

    public toggleModal = () => this.setState({ showModal: !this.state.showModal });
    public adopt = () => navigate(this.state.url);


    public render() {
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
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button style={{ backgroundColor: theme }}
                            onClick={this.toggleModal}>Adopt {name}</button>
                        )}
                    </ThemeContext.Consumer>
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

export default function DetailsErrorBoundary(props:RouteComponentProps<{ id:string }>) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    );
}
