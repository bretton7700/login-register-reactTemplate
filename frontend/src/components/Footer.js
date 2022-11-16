const Footer = () => {
    const today = new Date();
    return (
        <footer className='Footer'>
            <p>Ndovucloud &copy; {today.getFullYear()}</p>
        </footer>
    )
}

export default Footer
