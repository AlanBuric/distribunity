<template>
    <main>
        <table>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
            <tr>
                <td>Paper</td>
                <td>100</td>
                <td></td>
                <td>$0.01</td>
                <td>
                    <button>+</button>
                </td>
            </tr>
            <tr>
                <td>Screws</td>
                <td>250</td>
                <td></td>
                <td>$0.1</td>
                <td>
                    <button>+</button>
                </td>
            </tr>
        </table>
    </main>
</template>

<style scoped>
    main {
        padding: 10px;
        /* Overflow for table? */
    }

    table,
    th,
    td {
        border-collapse: collapse;
        border-bottom: 1px solid gray;
    }

    table {
        border-top: 1px solid gray;
    }

    td {
        text-align: center;
    }
</style>