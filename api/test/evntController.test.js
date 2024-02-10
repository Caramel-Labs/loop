const request = require("supertest");
const { EventModel } = require("../Models/eventModel");
const { ProfileModel } = require("../Models/usersModel");
const {societyModel} = require("../Models/societyModel");
const {degreeModel} = require("../Models/degreeModel");
const { facultyModel } = require('../Models/facultyModel');
const mongoose = require("mongoose");

let server, token;


describe("Testing app routes...", () => {
  describe("Testing Event Routes...", () => {
    beforeAll(() => {
      server = require("../index")
    })
    // beforeEach(() => {
    //   server = require("../index");
    // });
    afterAll(async () => {
      // await server.close();
      
    })

    afterEach(async () => {
      await EventModel.deleteMany({});
      await ProfileModel.deleteMany({});
    await societyModel.deleteMany({});
    await facultyModel.deleteMany({});
    });

    describe("FUNCTION(1) GET /events/:event_id", () => {
      it("should return the event when the event_id is provided", async () => {
        const testEvent = {
          name: "Test Event",
          description: "A test event",
          // Other properties...
        };

        const insertedEvent = await EventModel.create(testEvent);
        const res = await request(server).get(`/events/${insertedEvent._id}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("name", testEvent.name);
        expect(res.body).toHaveProperty("description", testEvent.description);
      }, 20000);

      it("should return a 404 for a non-existent event", async () => {
        const wrongEvent_id = "64c79c257bd1e0f15ef11478";

        const res = await request(server).get(`/events/${wrongEvent_id}`);

        expect(res.status).toBe(404);
        expect(res.text).toBe("Event not found");
      }, 20000);
    },20000);

    describe("FUNCTION(2) POST /events/all", () => {
      it("should return all the events which are open for the given faculty & all faculties", async () => {
        const postData = {
          faculty: "computing",
        };
        const objectsToInsert = [
          { name: "event1", selectedFaculties: ["computing", "engineering"] },
          { name: "event2", selectedFaculties: ["all"] },
          { name: "event3", selectedFaculties: ["law", "tec"] },
          { name: "event4", selectedFaculties: ["computing"] },
        ];

        await EventModel.insertMany(objectsToInsert);
        const res = await request(server).post("/events/all").send(postData);

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(3);
      }, 10000);

      it("should return a 404 for a non-existent event", async () => {
        const postData = {
          faculty: "management",
        };
        const objectsToInsert = [
          { name: "event1", selectedFaculties: ["computing", "engineering"] },
          { name: "event2", selectedFaculties: ["law", "tec"] },
        ];
        await EventModel.insertMany(objectsToInsert);
        const res = await request(server).post("/events/all").send(postData);

        expect(res.status).toBe(404);
        expect(res.text).toBe("No any upcomming events");
      }, 10000);
    });

    describe("FUNCTION(3) POST /events/newEvent", () => {
      it("should create a new event", async () => {
        const eventData = {
          name: "Sample Event",
          description: "A description of the event",
          selectedFaculties: ["Faculty A", "Faculty B"],
          date: "2023-10-20",
          time: "14:00",
          society: "Sample Society",
        };

        const response = await request(server)
          .post("/events/newEvent")
          .send(eventData);

        expect(response.status).toBe(200);
        expect(response.text).toBe("Event saved successfully:");

        const savedEvent = await EventModel.findOne({ name: "Sample Event" });
        expect(savedEvent).not.toBeNull();
      });
      it("should thow an error if required data is not provided", async () => {
        const eventData = {
          name: "Sample Event",
          description: "A description of the event",
          selectedFaculties: ["Faculty A", "Faculty B"],
          // date: "2023-10-20",
          // time: "14:00",
          // society: "Sample Society",
        };

        const response = await request(server)
          .post("/events/newEvent")
          .send(eventData);

        expect(response.status).toBe(400);
        expect(response.text).toBe("Joi validation failed...");
      });
    });
  });

describe("Testing User routes..", () => {
    beforeEach(() => {
      server = require("../index");
      token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imxhc2luZHUyMDAxIiwiaWF0IjoxNjk4Mjg0MjQ1fQ.Jzb40Q3vpuVDvDPlSUVeAFqP-VMjg8tt-v_WvhJJuPc";
    });

afterEach(async () => {
      await ProfileModel.deleteMany({});
      await degreeModel.deleteMany({});

    });

    describe("FUNCTION (1) POST /profiles/newProfile", () => {
        it("should register a new user", async () => {

          const bseDegree = new degreeModel({
            code: "bse", 
            name: "Bachelor of Software Engineering",

          });
          await bseDegree.save();

          const newUser = {
            firstName: "John",
            lastName: "Doe",
            username: "johnDoe",
            email: "39-bse-0005@kdu.ac.lk",
            password: "password123",
            isAdmin: false,
          };
        
          const response = await request(server)
            .post("/profiles/newProfile")
            .send(newUser);
 
          const savedBSE = await degreeModel.findOne({ code: "bse" });
          expect(savedBSE).not.toBeNull();
          expect(savedBSE.name).toBe("Bachelor of Software Engineering");
          //expect(response.status).toBe(200);
          //expect(response.text).toBe("Profile saved successfully:");

          // const savedUser = await ProfileModel.findOne({ username: "johnDoe" });
          // expect(savedUser).not.toBeNull();

      }, 20000);

      it("should return an error for invalid user data", async () => {
        const invalidUser = {
          // Missing first name, for example

          lastName: "Doe",
          username: "johndoe",
          email: "test@example.com",
          password: "password123",
        };

        const response = await request(server)
          .post("/profiles/newProfile")
          .set("Authorization", `Bearer ${token}`)
          .send(invalidUser);
        // Check the response status code and response body
        expect(response.status).toBe(400);
        expect(response.text).toContain('{\"errors\":[\"\\\"firstName\\\" is required\"]}');
      });
    });

    describe("FUNCTION (2) GET /profiles/thurunu2001", () => {
      it("should return the profile of a user..", async () => {
        const testUser = new ProfileModel({
          firstName: "Thurunu",
          lastName: "mihiranga",
          username: "thurunu2001",
          email: "testuser@example.com",
          password: "password123",
          intake: 39,
          faculty: "Engineering",
          isAdmin: false,
          eventId: [],
        });

        await testUser.save();

        const fetchProfileResponse = await request(server)
      .get("/profiles/thurunu2001")
      .set("Authorization", `Bearer ${token}`)

    // Check the response status
    expect(fetchProfileResponse.status).toBe(200);

    // Check if the returned user object matches the created user
    expect(fetchProfileResponse.body).toMatchObject({
      firstName: 'Thurunu',
      lastName: 'mihiranga',
      username: 'thurunu2001',
      
    });
      });

      it('should return a 404 response for a non-existent user', async () => {
        // Call the fetchProfile function for a non-existent user
        const fetchProfileResponse = await request(server)
          .get("/profiles/nonexistentuser")
          .set("Authorization", `Bearer ${token}`)
    
        // Check the response status
        expect(fetchProfileResponse.status).toBe(404);
        // Check if the response body contains the expected message
        expect(fetchProfileResponse.body).toEqual({ message: 'user object not found' });
      });
    });


    describe("FUNCTION (3) POST /profiles/join", () => {
      it("should join a user to an event..", async () => {
        const testUser = new ProfileModel({
          firstName: "TestUser",
          lastName: "TestUserLastName",
          username: "testuser123",
          email: "testuser@example.com",
          password: "password123",
          intake: 39,
          faculty: "Engineering",
          isAdmin: false,
          eventId: [],
        });

        const testEvent = new EventModel({
          name: "Test Event",
          description: "This is a test event.",
          participants: [],
          // Add more event properties as needed
        });

        await testUser.save();
        await testEvent.save();

        // Make a POST request to join the user to the event
        const requestBody = {
          user_id: testUser._id, // The user's MongoDB ObjectId
          event_id: testEvent._id, // The event's MongoDB ObjectId
        };

        const response = await request(server)
          .post("/profiles/join")
          .set("Authorization", `Bearer ${token}`)
          .send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          // Add expected properties from the user profile after joining the event
        });

        // Fetch the updated user and event from the database and verify that they were updated as expected
        const updatedUser = await ProfileModel.findById(testUser._id);
        const updatedEvent = await EventModel.findById(testEvent._id);

        expect(updatedUser.eventId).toContainEqual(testEvent._id);
        expect(updatedEvent.participants).toContainEqual(testUser._id);
      });
    },20000);
    describe("POST /profiles/addToFavourite", () => {
      it('should add an event to favorites', async () => {
        // Create a user and an event for testing
        const newUser = {
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          email: 'johndoe@example.com',
          password: 'password123',
          
        };
  
        const newEvent = {
          eventName: 'Sample Event',
          // add other event properties...
        };
  
        // Save the user and event to the database
        const userResponse = await request(server)
          .post("/profiles/newProfile")
          .set("Authorization", `Bearer ${token}`)
          .send(newUser);
  
        const eventResponse = await request(server)
          .post("/events/newEvent")
          .set("Authorization", `Bearer ${token}`)
          .send(newEvent);
  
        const user_id = userResponse.body._id;
        const event_id = eventResponse.body._id;
  
        // Call the addToFavourite function
        const addToFavouriteResponse = await request(server)
          .post("/profiles/addToFavourite")
          .set("Authorization", `Bearer ${token}`)
          .send({ user_id, event_id });
  
        // Check the response status
        expect(addToFavouriteResponse.status).toBe(200);
  
        // Check if the user's favoriteEventIds array includes the event_id
        const updatedUser = await ProfileModel.findById(user_id);

        if(updatedUser) {
          expect(updatedUser.favouriteEventIds).toContain(event_id);
        }
        else{
          console.error('User not found');
        }
      });
  
      it('should handle errors gracefully', async () => {
        // Try to add an event with invalid user_id and event_id
        const addToFavouriteResponse = await request(server)
          .post("/profiles/addToFavourite")
          .set("Authorization",`Bearer ${token}`)
          .send({ user_id: 'invalidUserId', event_id: 'invalidEventId' });
  
        // Check the response status
        expect(addToFavouriteResponse.status).toBe(500);
        // Check the response message
        expect(addToFavouriteResponse.body.message).toBe("Internal server error");
      });
    });

    describe("FUNCTION (5) POST /profiles/fetchFavourites", () => {
      it("should fetch a users favorite events", async () => {
        const testUser = new ProfileModel({
          username: "testuser123",
          email: "testuser@sample.com",
          password: "password123",
          favouriteEventIds: [], // Initialize the array of favorite event IDs
        });

        const testEvent1 = new EventModel({
          name: "Test Event 1",
          description: "This is Test Event 1.",
          // Add more event properties as needed
        });

        const testEvent2 = new EventModel({
          name: "Test Event 2",
          description: "This is Test Event 2.",
          // Add more event properties as needed
        });

        testUser.favouriteEventIds.push(testEvent1._id);
        testUser.favouriteEventIds.push(testEvent2._id);

        await testUser.save();
        await testEvent1.save();
        await testEvent2.save();

        const requestBody = {
          user_id: testUser._id.toString(), // Convert the user's MongoDB ObjectId to a string
        };

        const response = await request(server)
          .post("/profiles/addToFavourite")
          .set("Authorization", `Bearer ${token}`)
          .send(requestBody);

        expect(response.status).toBe(200);

        const testEvent1Id = testEvent1._id.toString();
        const testEvent2Id = testEvent2._id.toString();

        expect(response.body).toMatchObject({
          username: testUser.username,
          favouriteEventIds: expect.arrayContaining([
            testEvent1Id,
            testEvent2Id,
          ]),
        });
      });
    });

describe("FUNCTION (6) POST /profiles/removeFromFavourites", () => {
      it("should remove an event from a user's list of favorite events", async () => {
        const testUser = new ProfileModel({
          username: "testuser123",
          email: "testuser123@sample.com",
          password: "password123",
          favouriteEventIds: [], // Initialize the array of favorite event IDs
        });

	const testEvent1 = new EventModel({
          name: "Test Event 1",
          description: "This is Test Event 1 description..",
        });

        const testEvent2 = new EventModel({
          name: "Test Event 2",
          description: "This is Test Event 2 description..",
        });

        testUser.favouriteEventIds.push(testEvent1._id);
        testUser.favouriteEventIds.push(testEvent2._id);

        await testUser.save();
        await testEvent1.save();
        await testEvent2.save();

        const requestBody = {
          user_id: testUser._id.toString(), // Convert the user's MongoDB ObjectId to a string
          event_id: testEvent1._id.toString(), // Convert the event's MongoDB ObjectId to a string
        };

        const response = await request(server)
          .post("/profiles/addToFavourite")
          .set("Authorization", `Bearer ${token}`)
          .send(requestBody);

        expect(response.status).toBe(200);

        const updatedUser = await ProfileModel.findById(testUser._id);
        expect(updatedUser.favouriteEventIds).not.toContain(testEvent1._id);
      });
    });
  });

describe("Testing Society routes..", () => {
    beforeEach(() => {
      server = require("../index");
	      token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imxhc2luZHUyMDAxIiwiaWF0IjoxNjk4Mjg0MjQ1fQ.Jzb40Q3vpuVDvDPlSUVeAFqP-VMjg8tt-v_WvhJJuPc";
    });

    afterEach(async () => {
      await societyModel.deleteMany({});
    });

    describe('GET /all societies/', () => {
      it('should fetch all societies', async () => {
        const testSocieties = [
          { societyName: 'Society A', description: 'Description A' },
          { societyName: 'Society B', description: 'Description B' },
        ];

        await societyModel.insertMany(testSocieties);
       
        const response = await request(server).get('/society/all');
    
  
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
      });
    },20000);

    describe('GET /society/', () => {
      it('should fetch a society by ID', async () => {
  
        const society = new societyModel({
          societyName: "IEEE",
          description: "Institute of Electrical and Electronic Engineering",
        });
    
        await society.save();
        
        const response = await request(server).get(`/society/${society._id}`);
       
        expect(response.status).toBe(200);
        
        expect(response.body).toMatchObject({
          societyName: "IEEE",
          description: "Institute of Electrical and Electronic Engineering",
          
        });
      },10000);
    
    describe('GET /society/fetchSocity', () => {
        it('should handle the case when the society is not found', async () => {
          // Assuming you have a non-existing ID, e.g., "nonExistentId"
          const nonExistentId = new mongoose.Types.ObjectId;
      
          // Make a request to the fetchSociety endpoint with the non-existing ID
          const response = await request(server).get(`/society/fetchSocity/${nonExistentId}`);
      
          // Assertions
          expect(response.status).toBe(404);
      
          // Check if the response body is an object with a "message" property
          expect(response.body).toEqual(expect.any(Object));
          //expect(response.body.message).toBe('society not found');
        });
      });
    
      describe('POST /society/createSocietyAccount', () => {
          it('should create a new society successfully', async () => {
            const newSociety = {
              societyName: 'TestSociety',
              description: 'Test Society Description',
              // Include other required fields if any
            };
        
            const response = await request(server)
              .post('/society/newsociety')
              .send(newSociety);
        
            console.log(response.status); // Log the actual status received
        
            expect(response.status).toBe(200);
            expect(response.text).toBe('Society saved successfully:');
        
            const savedSociety = await societyModel.findById(response.body._id);
            expect(savedSociety).toBeNull();
          }, 30000);
        });
        
         it('should handle errors during society creation', async () => {
          
          const invalidSocietyData = {
            // Missing required fields, causing a validation error
            
          };
      
          const response = await request(server)
            .post('/society/newsociety')
            .send(invalidSocietyData);
      
          // Assertions
          expect(response.status).toBe(200); 
          
        });
      });
    }); 
    
    
describe("Testing Faculty routes..", () => {
    beforeEach(() => {
      server = require("../index");
        token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imxhc2luZHUyMDAxIiwiaWF0IjoxNjk4Mjg0MjQ1fQ.Jzb40Q3vpuVDvDPlSUVeAFqP-VMjg8tt-v_WvhJJuPc";
    });

    afterEach(async () => {
      await facultyModel.deleteMany({});
    });

  describe('GET /all', () => {
      it('should fetch all faculties', async () => {
        
        const facultiesInDatabase = [
          { facultyName: 'Faculty A' },
          { facultyName: 'Faculty B' },
          
        ];
    
        await facultyModel.insertMany(facultiesInDatabase);
    
        
        const response = await request(server).get('/faculty/all');
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(facultiesInDatabase.length);
    
        response.body.forEach((faculty, index) => {
          expect(faculty.facultyName).toEqual(facultiesInDatabase[index].facultyName);
        });
      });
    
      it('should handle the case when no faculties are found', async () => {
        // Clear the database to simulate an empty faculty collection
    
        // Make a GET request to fetch all faculties
        const response = await request(server).get('/all');
    
        // Assertions
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
      });
    });
  
    describe('POST /faculty/newfaculty', () => {
      it('should register a new faculty', async () => {
        // Define the data for the new faculty
        const newFacultyData = {
          facultyName: 'Computing',
          description: 'Faculty of Computing',
          admin: 'admin123',
          societies: ['Society1', 'Society2'],
        };
    
        // Make a POST request to register the new faculty
        const response = await request(server)
          .post('/faculty/newfaculty')
          .send(newFacultyData);
    
        // Assertions
        expect(response.status).toBe(200);
        expect(response.text).toBe('Faculty saved successfully:');
    
        // Check if the faculty is saved in the database
        const savedFaculty = await facultyModel.findOne({ facultyName: 'Computing' });
        expect(savedFaculty).not.toBeNull();
      },10000);
    });


})
      
 });
