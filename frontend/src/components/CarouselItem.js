

export const CarouselItem = ({manager}) => {
    return (
        <div className="manager-info">
            <h2>{manager.businessName} {manager.social_reason}</h2>
            <p>{manager.address}, {manager.city}</p>
            <p>Tel.: {manager.phone}</p>
            <p>Mail: {manager.email}</p>
        </div>
    )
}