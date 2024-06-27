class CreateActivitiesModel {
  adults = 0;
  childs = 0;
  arrival = 0;
  departure = 0;
  bundleId = '';
  propertyId = '';
  bundleUpgradeId = '';
  constructor(adults: number, childs: number, arrival: number,departure: number, bundleId: string, propertyId: string, bundleUpgradeId: string) {
    this.adults = adults;
    this.childs = childs;
    this.arrival = arrival;
    this.departure = departure;
    this.bundleId = bundleId;
    this.propertyId = propertyId;
    this.bundleUpgradeId = bundleUpgradeId;
  }
}

export {CreateActivitiesModel};