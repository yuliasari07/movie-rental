import {render, screen, cleanup} from '@testing-library/react';
import Movie from '../Movie'
import movieData from '../../mocks/movie.json'

afterEach(cleanup)

test('render movie component', () => {
    render(<Movie />)
    const movieComponent = screen.getByTestId('movie-component')
    expect(movieComponent).toBeInTheDocument()
})

test('render first movie', () => {
    render(<Movie movie={movieData} />)
    const title = screen.getByText('A New Hope')
    expect(title).toBeInTheDocument()
})