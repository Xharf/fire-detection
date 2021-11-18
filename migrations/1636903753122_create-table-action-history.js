/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('action_history', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    sys_device: {
     type: 'VARCHAR(50)',
     notNull: true,
    },
    action_name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    performed_by: {
      type: 'VARCHAR(50)',
      notNull: true,
    }, 
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint('action_history', 'fk_action.sys_device_sys_info.id', 'FOREIGN KEY(sys_device) REFERENCES sys_info(id) ON DELETE CASCADE');
};

exports.down = pgm => {
  pgm.dropConstraint('action_history', 'fk_action.sys_device_sys_info.id');
  pgm.dropTable('action_history');
};
