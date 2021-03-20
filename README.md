# Distribute Purchase Order

an example React project from `Next.js`

## Configuration

Configuration are in `.env`, it store default configuration.

This application have only 2 variables to config.

1. `MOCK_API` to enable/disable mock api
2. `GOOGLE_MAP_API_KEY` to use google map

## Installation

via `yarn`

```sh
yarn
```

via `npm`

```sh
npm i
```

## Run in local environment

via `yarn`

```sh
yarn dev
```

via `npm`

```sh
npm run dev
```

## Structure

```
.storybook/  ... storybook configuration
components/  ... pure component
containers/  ... component which use some hook and need to use inside provider
pages/       ... Next.js pages
reducers/    ... redux related
```

## Workflow

I use `git-hook` with `husky` to do `eslint` and `format` file on `pre-commit` to prevent developer push unformat code into origin. So the code will clean and no error or warning message in repository.

I use `commitizen`, `commitlint`, and `standard-version`. Developer need to commit in `conventional commit message` pattern, and `standard-version` will use it to generate `CHANGELOG` and `version`.

## Requirement

### Goal

- Responsive website
- Calculate price of distribution of production at specific locations

### Application Functionality

- System ask user to pick
  - a product
  - Date of distribution
  - Location
  - Amount per location
- Users can remove locations which they already added
- Provide price with dynamically update as they update form
- Employ validation to make sure user entered a valid date and has not try to order more unit than possible for a given date, product and location

### API

- Products GET https://5efabb3a80d8170016f758ee.mockapi.io/products
  - Id
  - Name = name of product
  - Max production = maximum number of product available per day in the future
    - Key = number of day in the future
    - Value = number of items that can be produced
    - note: if number of days in the future user has picked is greater than the largest day then use the largest
  - Price per unit = cost per item
- Locations GET https://5efabb3a80d8170016f758ee.mockapi.io/locations
  - Id
  - Name
  - Lat
  - Long
  - Max diet = total number of item can be distributed in one day at the location
  - Fee = daily fee of distributing items at the location
- CartPOST https://5efabb3a80d8170016f758ee.mockapi.io/cart
  - Date
  - Product id
  - Locations = array of (location id, quantity)

### UI

Should support desktop and mobile

#### Calculator Functionality

- User pick product and date base on maximum number of date available for product on that date
- User add locations by click “add”, system will show map, once user add location user can adjust the number of units for the location
- Location cost will be cost of the unit for that location and the location fee
- As location added and configured the total unit and cost will updated
- Location can be removed by click on “x”
- When submit, post to cart endpoint and show user a simple success page

#### Location Map Functionality

- On desktop show as modal
- On mobile show as full page
- Display all location on “google map” using their position
- Marker selected the pop up display
  - Name of location
  - Maximum number of units can be distributed
  - Fee for distribution
  - Add button
- Add button will return the user to the calculator page and add this location to the list
- Add button should be greyed out if location already been added

### Validation

- Date
  - can be only from tomorrow until 1 week later
- Location units
  - cannot be larger than the locations max distribution
  - total sum of all location units cannot be larger than the available production for that date and product
  - user need to be notified with a message if the number are invalid

### Dependencies

- create-next-app
- @chakra-ui/react
- ~~swr~~
- @reduxjs/toolkit
- google-map-react
- ~~react-hook-form~~

### Dev Dependencies

- prettier
- husky
- eslint
- line-staged
- commitlint
- commitizen
