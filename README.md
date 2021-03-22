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
# to run dev
yarn dev

# to run storybook
yarn start:storybook
```

via `npm`

```sh
# to run dev
npm run dev

# to run storybook
npm run start:storybook
```

## Structure

```
.storybook/  ... storybook configuration
components/  ... pure component
containers/  ... component which use some hook and need to use inside provider
pages/       ... Next.js pages
reducers/    ... redux related
```

## Notes

### development

I use component driven development; start by create a small component and run on `storybook`, so I can test it without running full application and effect another feature.

It's depend on size of project, for enterprise I recommend to do something like this and team can refactor or move components into a new repository or create new package or build a system design and reuse it in another project.

### state management

For a small project it might not need to use `redux`, but I just want to show how we should use `redux` with `redux-toolkit`

here a state for this application

```yml
rootState:
  product:
    selectedProduct: object of selected product
    selectedDate: object of selected date which have max_unit per day to use in `cart/addItem`
    products: array of products
    error: error message when cannot fetch data from API
    loading: loading status when fetch data from API
  location:
    selectedLocations: array of selected location id
    locations: array of locations
    error: error message when cannot fetch data from API
    loading: loading status when fetch data from API
  cart:
    items: array of selected location with selected qty, available unit, fee, and price
    total_qty: total units
    total_price: total cart price
    loading: loading status when call submit API
```

#### reducers

- **product**
  - fetchProducts (thunk)
    get products data from API
  - selectProduct
    set selected product when product select box are changes
  - clearProduct
    clear selected product when product select box are changes with empty value
  - selectDate
    set selected date when date select box are changes
  - clearDate
    clear selected date when date select box are changes with empty value
    and when product select box are changes too!
- **location**
  there are no reducers in `locations` but its state will changes when other reducers dispatch an action for example when `cart/addItem` are dispatch then it will push the selected location into `locatio.selectedLocation`
  - fetchLocations (thunk)
    get locations data from API
- **cart**
  - submitCart (thunk)
    call submit cart API
  - addItem (thunk)
    run validation and add item into cart
    note: there are no solution to get global state (need to get it to do validation) in "slice" except in "thunk".
  - removeItem
    remove item from cart
  - updateItem
    ... I forgot to do this one, so I just disable the input box and let's user remove items and add new one instead.

### framework and tools

For project with API request it might not need to use `redux-thunk` as well, but I want to how how to use `redux-thunk` with `redux-toolkit`. For this project I prefer to use `swr` or `react-query` to do request because it have state of request and can perform caching or background refresh.

## testing

I really don't have a time this whole week (and next week), and I'm not TDD guy. So, this project doesn't have unit test. But that doesn't mean I cannot write test.

If I have more time, I prefer to test on `reducers` since it has dependencies a lot (`addItem` then update more information, `removeItem` then remove `selectedLocation`) and after that test on `containers`, since it have a lot of behavior and need to calculate and display complex data, so I will use `@testing-library/react` to mock redux dependences and perform an action then expect UI component to render.

for `components` I might end up test with snapshot, since it doesn't have much logic.

### commit

I use `git-hook` with `husky` to do `eslint` and `format` file on `pre-commit` to prevent developer push unformat code into origin. So the code will clean and no error or warning message in repository.

This one are very useful when we work as a team (or alone), because I don't need to review invalid code format, I just go through and check logic or things that matters.

### release

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
