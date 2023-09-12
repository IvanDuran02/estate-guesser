import propertyImages from "../assets/Images";
import property from "../assets/Property";

export type queryProperty =
  | {
      address: string;
      id: number;
      link: string;
      price: string;
      zpid: string;
    }
  | undefined[];

export type queryPropertyImages =
  | {
      id: number;
      imageURL: string;
      propertyID: number;
    }
  | undefined[];

export const queryPropertyImages = (randomPropertyId: number) => {
  const imageData = [];
  // loops through all objects in the property array and finds all with matching propertyId and returns images in array format.
  for (let i = 0; i < propertyImages.length; i++) {
    if (propertyImages[i]?.propertyID == randomPropertyId) {
      imageData.push(propertyImages[i]);
    }
  }
  return imageData;
};

export const queryProperty = (randomPropertyId: number) => {
  const propertyData = [];
  // loops through all objects in the property array and finds all with matching propertyId and returns images in array format.
  for (let i = 0; i < propertyImages.length; i++) {
    if (property[i]?.id == randomPropertyId) {
      propertyData.push(property[i]);
    }
  }
  return propertyData;
};
