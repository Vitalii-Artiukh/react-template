import React from 'react';

export const SearchForm = ({ onSearch }) => {
  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const topic = form.elements.topic.value;

    if (form.elements.topic.value.trim() === '') {
      return;
    }

    onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="topic" placeholder="Search articles..." />
      <button type="submit">Search</button>
    </form>
  );
};
