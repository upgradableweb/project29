import styles from './table.module.css'

export default function MarksTable({ columns, rows }) {
    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className={styles.th} style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                    {rows.map((row, i) => {
                        return (
                            <tr key={i}>
                                {columns.map((column, index) => {
                                    const value = row[column.id];
                                    return (
                                        <td key={index} align={column.align}>
                                            {value}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
