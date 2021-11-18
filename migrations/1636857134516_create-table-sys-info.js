/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('sys_info', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        location: {
            type: 'TEXT',
            notNull: true,
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
        },
        updated_at: {
            type: 'TEXT',
            notNull: true,
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('sys_info');
};
