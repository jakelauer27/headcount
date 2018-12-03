

export default class DistrictRepository {
  constructor(data) {
    this.stats = this.removeDuplicates(data);
  }

  removeDuplicates(data) {
    const filteredDistricts = data.reduce( (filteredDistricts, district) => {
      if (!filteredDistricts[district.Location.toUpperCase()]) {
        filteredDistricts[district.Location.toUpperCase()] = {
          stats: {[district.TimeFrame]: this.roundToHundreth(district.Data)},
          location: district.Location.toUpperCase(),
          selected: ''
        }
      } else {
        filteredDistricts[district.Location.toUpperCase()].stats[district.TimeFrame] = this.roundToHundreth(district.Data);
      }
      return filteredDistricts
    }, {})
    return filteredDistricts
  }

  roundToHundreth(num) {
    const formatTest = RegExp('(?<!.)[0-1](?!.)|(?<!.)0\\.[0-9]?[0-9]?[0-9]?(?!.)');
    if (!formatTest.test(num)) {
      num = Number(num).toFixed(3);
    }
    return Number(num) || 0;
  }

  findByName(name) {
    if (!name) {return};
    const districtKeys = Object.keys(this.stats);

    const district = districtKeys.find( district => {
      return district.toUpperCase() === name.toUpperCase();
    })
    return this.stats[district];
  }

  findAllMatches(name) {
    const keys = Object.keys(this.stats)
    return keys.reduce((matches, district) => {
      if (!name || this.stats[district].location.includes(name.toUpperCase())) {
        matches.push(district)
      }
      return matches
    }, [])
  }

  findAverage(name) {
    const keys = Object.keys(this.stats[name].stats);
    const average = keys.reduce( (sum, stat) => {
      sum += this.stats[name].stats[stat];
      return sum
    }, 0) / keys.length
    
    return this.roundToHundreth(average)
  }

  compareDistrictAverages(district1, district2) {
    const dis1Av = this.findAverage(district1.toUpperCase());
    
    if (!district2) return {[district1.toUpperCase()]: dis1Av};

    const dis2Av = this.findAverage(district2.toUpperCase());

    const districtAverages = {
      [district1.toUpperCase()]: dis1Av,
      [district2.toUpperCase()]: dis2Av,
    }

    let compared = 0;

    dis1Av >= dis2Av ? 
      compared = this.roundToHundreth(dis2Av / dis1Av): 
      compared = this.roundToHundreth(dis1Av / dis2Av);

    return {...districtAverages, compared}
  }
}
