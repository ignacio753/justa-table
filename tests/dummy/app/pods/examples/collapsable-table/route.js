import Ember from 'ember';
import faker from 'faker';

export default Ember.Route.extend({
  model() {
    let userGroups = [
      {
        label: 'Happy Users',
        isCollapsed: true,
        childRows: []
      },
      {
        label: 'Crazy Users',
        isCollapsed: true,
        childRows: []
      },
      {
        label: 'Super Users',
        isCollapsed: true,
        childRows: []
      }
    ];

    userGroups.forEach((group) => {
      let users = [];

      for (let i = 0; i < 10; i++) {
        let user = Ember.Object.create({
          displayName: faker.name.findName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zipCode: faker.address.zipCode(),
          flagged: faker.random.boolean(),
          company: faker.company.companyName()
        });

        users.push(user);
      }

      group.childRows = group.childRows.concat(users);
    });

    return userGroups;
  },

  actions: {
    toggleExpandAll() {
      const model = Ember.A(this.get('controller.model'));
      // const anyExpanded = model.isAny('isCollapsed', false);
      const anyExpanded = model.isEvery('isCollapsed', false);

      if (anyExpanded) {
        model.setEach('isCollapsed', true);
      } else {
        model.setEach('isCollapsed', false);
      }
    }
  }
});
