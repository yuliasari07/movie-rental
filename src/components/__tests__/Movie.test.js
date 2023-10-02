import {render, screen, cleanup} from '@testing-library/react';
import Movie from '../Movie'

test('render movie component', () => {
    render(<Movie />)
    const movieComponent = screen.getByTestId('movie-component')
    expect(movieComponent).toBeInTheDocument()
})