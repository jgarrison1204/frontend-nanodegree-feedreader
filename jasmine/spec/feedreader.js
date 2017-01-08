/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         -------It displays 1 failure.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has url', function(){
            allFeeds.forEach(function(item, i){                
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe('');
            })
         })         

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has url', function(){
            allFeeds.forEach(function(item, i){                
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe('');
            })
         })
    });


    describe("The menu", function(){
        var body = $("body"),
            menu = $(".menu-icon-link");
        /* The menu element is hidden by default.
         */
         it("closed by default", function(){
            expect(body.hasClass("menu-hidden")).toBe(true);
         })
         /* Menu changes visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('opens on click', function(){
            menu.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
        });

        it('closed when clicked again', function(){
            menu.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    })

    describe('Initial Entries', function() {
        /* loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('render at least 1 entry', function() {
            var totalEntries = $('.feed .entry').length;
            expect(totalEntries).toBeGreaterThan(0);
        });
    });
    
        /* New feed is loaded by the loadFeed function that the content actually changes.
         */

    describe('New Feed Selection', function() {
        var feed1, feed2;

        beforeEach(function(done) {
            loadFeed(0, function(){
                feed1 = $('.feed .entry').find('h2')[0].textContent;
                loadFeed(1, done)
            });
        });

        it('renders results of feed', function(done) {
            feed2 = $('.feed .entry').find('h2')[0].textContent;
            expect(feed1).not.toEqual(feed2);
            done();
        });
    });
}());
