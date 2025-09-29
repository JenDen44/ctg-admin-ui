/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    $schema: 'https://raw.githubusercontent.com/sverweij/dependency-cruiser/develop/schema.json',
    options: {
        doNotFollow: { path: 'node_modules' },
        tsConfig: { fileName: 'tsconfig.json' },
        includeOnly: '^src',
    },
    forbidden: [
        {
            name: 'no-circular',
            severity: 'error',
            comment: 'Запрещены циклические зависимости',
            from: {},
            to: { circular: true },
        },
    ],
};
