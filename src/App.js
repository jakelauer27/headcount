import React, { Component } from 'react';
import DistrictRepository from './helper.js';
import './styles/reset.css';
import './styles/App.css';
import Card from './Card';
import Search from './Search';
import KinderGardenData from './data/kindergartners_in_full_day_program';
import {uid} from 'react-uid';
import CompareCard from './CompareCard'

class App extends Component {
  constructor() {
    super();
    this.state = {
      allDistricts: {},
      districts: {stats: {colorado: {location: '', stats: { 2000: 1}}}},
      showMore: false,
      buttonText: 'show more',
      selectedCards: [],
      compareObject: {}
    }
  }

  componentDidMount() {
    this.setState({
      allDistricts: new DistrictRepository(KinderGardenData),
      districts: new DistrictRepository(KinderGardenData)
    })
  }

  toggleShow = () => {
    let buttonText;
    !this.state.showMore ? buttonText = 'show less' : buttonText = 'show more';
    this.setState({
      showMore: !this.state.showMore,
      buttonText: buttonText
    })
  }

  search = (string) => {
    const districtKeys = Object.keys(this.state.allDistricts.stats)
    const filteredDistricts = districtKeys.reduce( (districts, district) => {
      if (this.state.allDistricts.stats[district].location.includes(string)) {
        districts.stats[district] = this.state.allDistricts.stats[district]
      }
      return districts
    }, {stats: {}})
    this.setState({
      districts: filteredDistricts
    })
  }

  selectCard = (location) => {
    const districts = {...this.state.allDistricts};
    const districtKeys = Object.keys(districts.stats);
    const selectedCardKey = districtKeys.find( card => {
      return this.state.allDistricts.stats[card].location === location
    })
    const otherSelectedCard = this.state.selectedCards[0] || {location: null};
    const newSelectedCard = districts.stats[selectedCardKey];
    
    newSelectedCard.selected = 'selected';
    this.setState({
      selectedCards: [newSelectedCard, ...this.state.selectedCards],
      districts: districts,
      compareObject: this.state.allDistricts.compareDistrictAverages(newSelectedCard.location, otherSelectedCard.location)
    } , () => {
      if (this.state.selectedCards.length === 3) {
        this.deselectCard(districts, districtKeys);
      }
    })
  } 

  deselectCard(districts, cardKeys) {
    const newSelected = [...this.state.selectedCards];
    const deselectedCardKey = cardKeys.find( card => {
      return this.state.allDistricts.stats[card].location === this.state.selectedCards[2].location
    })

    districts.stats[deselectedCardKey].selected = '';
    newSelected.pop()
    this.setState({
      selectedCards: newSelected,
      districts: districts
    })
  }

  render() {
    const { districts, showMore, buttonText, selectedCards, compareObject } = this.state;
    const districtKeys = Object.keys(districts.stats);
    const cards = districtKeys.map( (district, i) => {
      let amount = 28;
      if (showMore) {
        amount = districtKeys.length;
      }

      if (i < amount) {
        return (
          <Card 
            location={districts.stats[district].location}
            stats={districts.stats[district].stats}
            selected={districts.stats[district].selected}
            id={uid(district)}
            selectCard={this.selectCard}
            key={uid(district)}
          />
        )
      } else {
        return ''
      }
    })

    return (
      <div className='App'>
      <h1 className='main-title'>HEADCOUNT 2.0</h1>
      <div className='compare-container'>
        <CompareCard card={selectedCards[0]} compareStats={compareObject} />
        <CompareCard card={selectedCards[1]} compareStats={compareObject} />
      </div>
      <div className='compare-chart'>

      </div>
       <Search 
        search={this.search}
       />
       <section className='card-container'>
          {cards}
        <button 
          className='show-more-btn'
          onClick={() => this.toggleShow()}
          >{buttonText}
        </button>
        </section>
      </div>
    );
  }
}

export default App;
