/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('urls').del()
      .then(function () {
          // Inserts seed entries
          return knex('urls').insert([
              {
                  original_url: 'https://example.com',
                  short_url: 'qwseedr2',
                  click_count: 0,
              },
              {
                  original_url: 'https://another-example.com',
                  short_url: 'QWE2',
                  click_count: 0,
              },
              // Add more data as needed
          ]);
      });
};
