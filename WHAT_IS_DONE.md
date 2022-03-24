Initial Commit 13/3/2020
  
Login Register, update user.

JWT auth that sings client after login and veryfies it at every '/main' request for now, as long token is saved in localStorage.

Language translation similar to 'i18', in html it is written the same way, and works as a pipe.

Post with like and comment system.

Dark mode which can be toggled from navigation component in menu. And good setup for later theming expansion.
Dark mode works via DarkModeService compoment that emits event on change, and that makes this sistem independent.


Socket.io for chat service and later maybe for gaming communication.
   
This was all just making of a base for project sort of a backbone...