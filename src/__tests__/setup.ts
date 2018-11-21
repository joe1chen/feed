import { Feed } from "../feed";

const updated = new Date("Sat, 13 Jul 2013 23:00:00 GMT");
const published = new Date("Sat, 10 Jul 2013 23:00:00 GMT");

export const sampleFeed = new Feed({
  title: "Feed Title",
  description: "This is my personnal feed!",
  link: "http://example.com/",
  id: "http://example.com/",
  feed: "http://example.com/sampleFeed.rss",
  image: "http://example.com/image.png",
  copyright: "All rights reserved 2013, John Doe",
  updated, // optional, default = today

  author: {
    name: "John Doe",
    email: "johndoe@example.com",
    link: "https://example.com/johndoe"
  },

  feedLinks: {
    json: "https://example.com/json",
    atom: "https://example.com/atom"
  }
});

sampleFeed.addCategory("Technology");

sampleFeed.addContributor({
  name: "Johan Cruyff",
  email: "johancruyff@example.com",
  link: "https://example.com/johancruyff"
});

sampleFeed.addItem({
  title: "Hello World",
  id: "https://example.com/hello-world",
  link: "https://example.com/hello-world",
  description: "This is an article about Hello World.",
  content: "Content of my item",
  author: [
    {
      name: "Jane Doe",
      email: "janedoe@example.com",
      link: "https://example.com/janedoe"
    },
    {
      name: "Joe Smith",
      email: "joesmith@example.com",
      link: "https://example.com/joesmith"
    }
  ],
  contributor: [
    {
      name: "Shawn Kemp",
      email: "shawnkemp@example.com",
      link: "https://example.com/shawnkemp"
    },
    {
      name: "Reggie Miller",
      email: "reggiemiller@example.com",
      link: "https://example.com/reggiemiller"
    }
  ],
  extensions: [
    {
      name: "_item_extension_1",
      objects: {
        about: "just an item extension example",
        dummy1: "example"
      }
    },
    {
      name: "_item_extension_2",
      objects: {
        about: "just a second item extension example",
        dummy1: "example"
      }
    }
  ],
  date: updated,
  image: "https://example.com/hello-world.jpg",
  published,
  elements: [{
    'media:content': [{
      _attr: {
        url: 'https://v3spec.msn.com/image1.jpg',
        type: 'image/jpeg',
        medium: 'image'
      }
    }, {
      'media:credit': 'Joe Gargery/Fabrikam Images'
    }]
  }]
});

sampleFeed.addExtension({
  name: "_example_extension",
  objects: {
    about: "just an extension example",
    dummy: "example"
  }
});

sampleFeed.namespaces = {
  "xmlns:dcterms": "https://purl.org/dc/terms/",
  "xmlns:media": "https://search.yahoo.com/mrss/"
};

sampleFeed.elements = [{
  'media:content': [{
    _attr: {
      url: 'https://v3spec.msn.com/image1.jpg',
      type: 'image/jpeg',
      medium: 'image'
    }
  }, {
    'media:credit': 'Joe Gargery/Fabrikam Images'
  }]
}];
