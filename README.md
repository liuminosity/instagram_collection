# instagram_collection
Currently deployed on [heroku!](https://boiling-headland-4189.herokuapp.com)

##Running this locally:
- Clone this repo
- From the root folder, run ```npm install```, ```gulp```, and in a separate tab, ```node server/server.js``` in your console
- That's it! The database is already linked up to one hosted on heroku

##Features:
- Search for tags by recency, or within a date range
- Save photos you want to a collection
- View your past saved collections
- View images/play videos from the page
- Instagram implicit client-side authorization

##Underneath the hood:
- Front-end built with React.js for fast rendering/re-rendering of the webapp and for enforcing clean, modular code
- Pagination results cached ahead of call for performance
- Single source of truth/single state for clarity, with data and callbacks passed down via props
- User-login data never sent to nor stored on server, only bare minimum stored on server for the purpose of saving the user's collections
- Back-end built with Node/Express, with data stored in MongoDB
- To prevent overly expensive API calls for searches within a date range, API calls are limited to a set number, currently set to a lower number just to not waste API calls. When that limit is hit, server suggests a new date range for the query

##Component structure:
```
- App (app.jsx)
  - 'home' view
    - LoginButton (/components/LoginButton)
    - SearchQuery (/components/SearchQuery)
    - ImageList (/components/ImageList)
      - ImageBox (/components/ImageBox)
  - 'addCollection' view
    - AddCollection (/components/AddCollection)
    - CollectionCacheList (/components/CollectionCacheList)
      - CollectionImageBox (/components/CollectionImageBox)
  - 'collections' view
    - CollectionsList (/components/CollectionsList)
    - CollectionsImageList (/components/CollectionsImageList)
      - CollectionImageBox (/components/CollectionImageBox)
```
