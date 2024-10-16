import React from 'react';

interface LegendProps {
    number: number;
    currency: boolean;
}

const Legend: React.FC<LegendProps> = ({ number, currency }) => {
    const formattedNumber = currency ? `$${number.toLocaleString()}` : number.toLocaleString();

    return (
        <div style={styles.container}>
            {formattedNumber}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default Legend;