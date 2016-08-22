/**
* @file     feedreader.js - Feed Reader Testing
* @author   Abdullah Alam
* @email    abdullah.alam.omi@gmail.com
*/

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against my application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before I get started on
         * the rest of this project. What happens when I change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('should have a defined URL', function() {
            allFeeds.forEach(function(feed) {
                feedUrl = feed.url;
                expect(feedUrl).toBeDefined();
                expect(feedUrl.length).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('should have a defined name', function() {
            allFeeds.forEach(function(feed) {
                feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName.length).not.toBe(0);
            });
        });
    });

    /* Write a new second test suite named "The menu" */

    describe('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default. I'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        var body = $('body');
        it('should have menu element hidden by default by having class menu-hidden', function() {
            expect(body.hasClass('menu-hidden')).toEqual(true);
        });

        describe('when clicked', function() {

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
                beforeEach(function() {
                    $('.menu-icon-link').trigger('click');
                });

                it('should display the menu', function() {
                    expect(body.hasClass('menu-hidden')).toEqual(false);
                });

                it('should hide the menu', function() {
                    expect(body.hasClass('menu-hidden')).toEqual(true);
                });
          });
    });


    /* Write a new third test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has added entries', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(1);
            done();
        });
    });

    /* Write a new fourth test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var entry_before,
            entry_after;

        beforeEach(function(done) {
            loadFeed(0, function() {
                entry_before = $('.feed').find('h2')[0].innerText;
                done();
            });
        });

        afterEach(function(done) {
            loadFeed(0, done);
        });

        it('should be new stuff', function(done) {
            loadFeed(1, function() {
                entry_after = $('.feed').find('h2')[0].innerText;
                expect(entry_before).not.toEqual(entry_after);
                done();
            });
        });

    });
}());