
# import math

# class Pagination:
#     def __init__(self, items=None, page_size=10):
#         self.items = items if items is not None else []
#         self.page_size = page_size
#         self.current_idx = 0  
#         self.total_pages = math.ceil(len(self.items) / self.page_size) if self.items else 0

#     def get_visible_items(self):
#         start = self.current_idx * self.page_size
#         end = start + self.page_size
#         return self.items[start:end]

#     def go_to_page(self, page_num):
#         if page_num < 1 or page_num > self.total_pages:
#             raise ValueError(f"Invalid page number: {page_num}")
#         self.current_idx = page_num - 1
#         return self

#     def first_page(self):
#         self.current_idx = 0
#         return self

#     def last_page(self):
#         if self.total_pages > 0:
#             self.current_idx = self.total_pages - 1
#         return self

#     def next_page(self):
#         if self.current_idx < self.total_pages - 1:
#             self.current_idx += 1
#         return self

#     def previous_page(self):
#         if self.current_idx > 0:
#             self.current_idx -= 1
#         return self

#     def __str__(self):
#         return "\n".join(str(item) for item in self.get_visible_items())

# #tests
# p = Pagination(items=[i for i in range(1, 101)], page_size=10)


# print("Initial pagination:")
# print(p)

# print("Go to page 2:")
# p.go_to_page(2)
# print(p)

# print("Next page:")
# p.next_page()
# print(p)

# print("Previous page:")
# p.previous_page()
# print(p)

# print("Last page:")
# p.last_page()
# print(p)

# alphabetList = list("abcdefghijklmnopqrstuvwxyz")
# p = Pagination(alphabetList, 4)

# print(p.get_visible_items())

# p.next_page()
# print(p.get_visible_items())


# p.last_page()
# print(p.get_visible_items())


# p.go_to_page(3)
# print(p.get_visible_items())


# print(str(p))


# print(p.current_idx + 1)  

# try:
#     p.go_to_page(0)
# except ValueError as e:
#     print(e)  