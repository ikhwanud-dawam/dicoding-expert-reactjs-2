/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="n@example.com"]').should('be.visible');
    cy.get('input[placeholder="********"]').should('be.visible');
    cy.get('button').contains(/^Sign In$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button').contains(/^Sign In$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="n@example.com"]').type('testemail@testemail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Sign In$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="n@example.com"]').type('testemail@testemail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="********"]').type('wrong_password');

    // menekan tombol Login
    cy.get('button').contains(/^Sign In$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="n@example.com"]').type('qwerty@qwerty.com');

    // mengisi password
    cy.get('input[placeholder="********"]').type('qwerty@qwerty.com');

    // menekan tombol Login
    cy.get('button').contains(/^Sign In$/).click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('header').contains(/^Dicoding Forum App$/).should('be.visible');
    cy.get('button').contains(/^Logout$/).should('be.visible');
  });
});
