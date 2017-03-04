import React, { Component } from "react";
import Review from "./Review.jsx";
import Rating from "react-rating";
import cookie from 'react-cookie';
import store from "../../tuberStore";
import { profileActions } from "../../actions";
import axios from 'axios';

export default class Reviews extends Component {

  constructor(props) {
    super(props)
    this.state = {};
  }

  handleReview(e) {
    e.preventDefault();
    const user = cookie.load("user")
    if (user) {
      const data = {
        content: document.getElementById("new-review-text").value,
        rating: this.state.rating,
        student_id: user.id,
        tutor_id: this.props.profileID
      }
       store.dispatch(profileActions.postReview(data));
    } else { console.log("Not logged in")} // TODO: find better error handle!
  }

  handleRating(r) {
    console.log(r)
    this.state.rating = r;
  }

  render() {
    return (
      <section id="reviews">
        <h2 className="review-summary">
          <Rating
           readonly={true}
           initialRate={4}
           empty='fa fa-star-o'
           full='fa fa-star'
          />
          &nbsp;in {this.props.reviews.length} reviews
        </h2>
        <form onSubmit={(e) => this.handleReview(e)} className="new-review">
          <div>
            Rate your lesson &nbsp;<Rating onChange={(r) => this.handleRating(r)} name="new-rating"
            empty='fa fa-star-o' full='fa fa-star' />
          </div>
          <label htmlFor="new-review">Your Review here</label>
          <textarea id="new-review-text" name="text" placeholder="Your Review here" />
          <button type="submit" className="">Submit</button>
      </form>
       {this.props.reviews.map(r => <Review key={r.id} review={r} />)}
      </section>
    )
  }
}