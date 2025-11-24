const getStatusStyle = (status) => {
  return {
    color: status === 'Active' ? 'green' : (status === 'Away' ? 'orange' : 'gray'),
    fontWeight: 'bold',
  };
};
const UserCard = ({ name, role, status, avatarUrl, layout = 'compact' }) => {
  const statusStyle = getStatusStyle(status);
  
  const cardStyle = {
    padding: '15px',
    margin: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexDirection: layout === 'full' && window.innerWidth < 600 ? 'column' : 'row',
  };

  const avatarStyle = {
    width: layout === 'compact' ? '40px' : '60px',
    height: layout === 'compact' ? '40px' : '60px',
    borderRadius: '50%',
    objectFit: 'cover',
  };

  if (layout === 'compact') {
    return (
      <article style={cardStyle}>
        <img src={avatarUrl} alt={`${name} avatar`} style={avatarStyle} />
        <h4>{name}</h4>
      </article>
    );
  }
  return (
    <article style={cardStyle}>
      <img src={avatarUrl} alt={`${name} avatar`} style={avatarStyle} />
      <div>
        <h3>{name}</h3>
        <p><strong>Rol:</strong> {role}</p>
        <p><strong>Estado:</strong> <span style={statusStyle}>{status}</span></p>
      </div>
    </article>
  )
}

export default UserCard
