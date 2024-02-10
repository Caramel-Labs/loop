const request = require('supertest');
const { ProfileModel } = require('../../Models/usersModel'); 
const { degreeModel } = require('../../Models/degreeModel');
const app = require('../../index');
const bcrypt = require('bcrypt'); 

jest.mock('bcrypt');

describe('registerUser', () => {
  it('should hash the password before saving the user', async () => {
    // Mock dependencies
    jest.spyOn(bcrypt, 'genSalt').mockReturnValue(Promise.resolve('salt'));
    jest.spyOn(bcrypt, 'hash').mockReturnValue(Promise.resolve('hashed_password'));

    const req = {
      body: {
        email: 'test@email.com',
        password: 'test_password',
      },
    };

  
    jest.spyOn(ProfileModel, 'findOne').mockReturnValue(null);
    const mockSave = jest.fn().mockReturnValue(Promise.resolve());
    jest.spyOn(ProfileModel.prototype, 'save').mockImplementation(mockSave);

    await registerUser(req);

    // Verify bcrypt functions were called with expected arguments
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith('test_password', 'salt');

    // Verify saved user object has hashed password
    expect(mockSave.mock.calls[0][0].password).toBe('hashed_password');
  });

  
});