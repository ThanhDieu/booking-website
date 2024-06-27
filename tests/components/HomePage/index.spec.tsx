import store from '@/store';
import { render, screen } from '@testing-library/react';
import Home from '@/components/HomePage';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import '../../matchMedia';

const mockProps = {
    attributes: {
      hero: {
        title: 'Discover Your Next Adventure',
        tag: {
          media: {
            data: {
              attributes: {
                url: 'https://example.com/hero-banner.jpg',
              },
            },
          },
          title: 'Travel the World with Us!',
          subtitle: 'Book your next vacation and save up to 20%',
          linkText: 'Book Now',
          link: 'https://example.com/book-now',
        },
        media: {
          data: {
            attributes: {
              url: 'https://example.com/hero-banner-background.jpg',
            },
          },
        },
      },
      topMenu: {
        entries: [
          { title: 'Home', link: '/' },
          { title: 'About Us', link: '/about' },
          { title: 'Contact Us', link: '/contact' },
        ],
      },
      packages: {
        title: 'Holiday Packages',
        subtitle: 'Book your perfect holiday today!',
        packages: [
          {
            title: 'Bali Adventure',
            price: 1000,
            description: 'A 7-day trip to Bali with flights, accommodation, and activities included.',
            image: 'https://example.com/bali-adventure.jpg',
          },
          {
            title: 'Thailand Discovery',
            price: 1500,
            description: 'A 10-day trip to Thailand with flights, accommodation, and activities included.',
            image: 'https://example.com/thailand-discovery.jpg',
          },
        ],
      },
      highlightHotels: {
        title: 'Featured Hotels',
        subtitle: 'Stay in the best hotels around the world.',
        mapHotelTitle: 'Hotels Near You',
        mapHotelSubtitle: 'Find the perfect hotel for your next vacation.',
        highlightItems: []
      }
    },
    activitiesPackage: [
        {
          "activityId": "1234567890",
          "icon": "https://example.com/activity-icon-1.jpg",
          "media": "https://example.com/activity-image-1.jpg",
          "name": "Surfing Lesson",
          "title": "Learn to surf from the best!",
          "extendedData": {
          }
        },
        {
          "activityId": "9876543210",
          "icon": "https://example.com/activity-icon-2.jpg",
          "media": "https://example.com/activity-image-2.jpg",
          "name": "Temple Tour",
          "title": "Visit the ancient temples of Bali.",
          "extendedData": {
          }
        },
        {
          "activityId": "3456789012",
          "icon": "https://example.com/activity-icon-3.jpg",
          "media": "https://example.com/activity-image-3.jpg",
          "name": "Cooking Class",
          "title": "Learn to cook your favorite Thai dishes.",
          "extendedData": {
          }
        },
        {
          "activityId": "2345678901",
          "icon": "https://example.com/activity-icon-4.jpg",
          "media": "https://example.com/activity-image-4.jpg",
          "name": "Elephant Sanctuary Visit",
          "title": "Spend time with elephants in a natural environment.",
          "extendedData": {
          }
        }
      ]
      ,
    homeBundles: [
      {
        bundleId: '1234567890',
        createdBy: 'Luke',
        activities: [
          {
            activityId: '1234567890',
            icon: 'https://example.com/activity-icon-1.jpg',
            media: 'https://example.com/activity-image-1.jpg',
            name: 'Surfing Lesson',
            title: 'Learn to surf from the best!',
          },
          {
            activityId: '9876543210',
            icon: 'https://example.com/activity-icon-2.jpg',
            media: 'https://example.com/activity-image-2.jpg',
            name: 'Temple Tour',
            title: 'Visit the ancient temples of Bali.',
          },
        ],
        bundleServices: [],
        currency: 'USD',
        description: 'A 7-day trip to Bali with flights, accommodation, and activities included.',
        landscape: 
            {
                "landscapeId": "beach",
                "icons": {
                  "dark": "https://example.com/icons/beach-dark.svg",
                  "light": "https://example.com/icons/beach-light.svg"
                },
                "name": "Beach",
                "title": "Relax on a beautiful beach"
              }
        ,
        media: ['https://example.com/bali-adventure-image-1.jpg', 'https://example.com/bali-adventure-image-2.jpg'],
        name: 'Bali Adventure',
        periods: [],
        price: 1000,
        priceMin: 1000,
        property: {
            "extId": "ritz-carlton-bali",
            "city": "Nusa Dua",
            "country": "Indonesia",
            "currency": "USD",
            "description": "The Ritz-Carlton, Bali is a luxury hotel located on the beachfront in Nusa Dua. The hotel offers a variety of amenities, including a spa, fitness center, multiple restaurants, and a private beach. Guests can also enjoy a variety of activities, such as surfing, swimming, and golfing.",
            "media": [
              "https://example.com/ritz-carlton-bali-1.jpg",
              "https://example.com/ritz-carlton-bali-2.jpg",
              "https://example.com/ritz-carlton-bali-3.jpg"
            ],
            "name": "The Ritz-Carlton, Bali",
            "version": "1",
            "extendedData": {
            },
            "location": {
              "addressLine1": "Jalan Raya Nusa Dua Selatan",
              "city": "Nusa Dua",
              "countryCode": "ID",
              "postalCode": "80363"
            }
        },
        specialBundles: [],
        title: 'Bali Adventure',
        isHomePage: true,
      }
    ]
  }

  // mock useRouter
  jest.mock('next/router', () => ({
    useRouter: jest.fn()
  }))

  // setup a new mocking function for push method
  const pushMock = jest.fn()


test('Home renders correctly', () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {},
    push: pushMock,
  })
  render (
    <Provider store={store}>
      <Home {...mockProps} />
    </Provider>
  );

  expect(screen.getByText('Discover Your Next Adventure')).toBeInTheDocument();
  expect(screen.getByText('Travel the World with Us!')).toBeInTheDocument();
  expect(screen.getByText('Holiday Packages')).toBeInTheDocument();
  expect(screen.getByText('Bali Adventure')).toBeInTheDocument();
});
