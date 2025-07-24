interface User {
  readonly id: number;
  username : string;
  email: string;
  isActive?: boolean;
  role : 'admin' | 'user' | 'guest';
}

type UserProfile = {
  username: string;
  birthday: Date;
  address?: string;
}

class UserAccount implements User {
  public readonly id: number;
  public username: string;
  public email: string;
  public isActive?: boolean;
  public role: 'admin' | 'user' | 'guest';
  private password: string;

  constructor(id: number, username: string, email: string, role: 'admin' | 'user' | 'guest', password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.password = password;
  }

  public validatePassword(password: string): boolean {
    return this.password === password && password.length >= 8;

  }
}

class AdminUser extends UserAccount {
  public permissions: string[];

  constructor(id: number, username: string, email: string, password: string, permissions: string[]) {
    super(id, username, email, 'admin', password);
    this.permissions = permissions;
  }

  public validatePassword(password: string): boolean {
    return password.length >= 12;
  }
}


function createUser(userData: Partial<User>): User {  
  const user : User = {
    id : userData.id ?? Date.now(),
    username : userData.username ?? 'Unknown',
    email : userData.email ?? '',
    isActive : userData.isActive ?? true,
    role : userData.role ?? 'user'
  };

  return user;
}

function formatUserInfo(user: User | UserProfile) : string {
  if('username' in user && 'role' in user){
    return `User ${user.username} (${user.role})`;
  }
  else if ('birthday' in user){
    const birthdayStr = user.birthday.toLocaleDateString();
    return `User ${user.username} born on ${birthdayStr}`;
  }
  else {
    return 'Unknown user type';
  }
}



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-2xl mx-auto space-y-6">
      
      <!-- User Information Display -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">User Management System</h1>
        
        <!-- Current Users List -->
        <div id="usersList" class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Current Users:</h2>
          <div id="usersContainer" class="space-y-2">
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Username</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Email</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Role</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Status</th>
                  </tr>
                </thead>
                <tbody id="usersTableBody" class="divide-y divide-gray-200">
                  <tr>
                    <td colspan="5" class="px-4 py-8 text-center text-gray-500 italic">
                      No users created yet. Click "Create New User" to add one.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Create User Button -->
        <div class="mt-6 text-center">
          <button id="toggleFormBtn" 
                  class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium">
            Create New User
          </button>
        </div>
      </div>

      <!-- Create User Form -->
      <div id="createUserForm" class="bg-white rounded-lg shadow-md p-6 hidden">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Create New User</h2>
          <button id="closeFormBtn" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        
        <form id="userForm" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username:</label>
            <input type="text" id="username" name="username" required 
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input type="email" id="email" name="email" required 
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input type="password" id="password" name="password" required 
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Role:</label>
            <select id="role" name="role" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="guest">Guest</option>
            </select>
          </div>
          <div class="flex space-x-3">
            <button type="submit" 
                    class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200">
              Create User
            </button>
            <button type="button" id="cancelBtn"
                    class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200">
              Cancel
            </button>
          </div>
        </form>
        
        <div id="result" class="mt-6"></div>
      </div>
    </div>
  </div>
`
let users: User[] = [];

const form = document.getElementById("userForm") as HTMLFormElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;
const passwordInput = document.querySelector("#password") as HTMLInputElement;
const roleSelect = document.querySelector("#role") as HTMLSelectElement;
const toggleFormBtn = document.getElementById("toggleFormBtn") as HTMLButtonElement;
const createUserForm = document.getElementById("createUserForm") as HTMLDivElement;
const closeFormBtn = document.getElementById("closeFormBtn") as HTMLButtonElement;
const cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;

function displayUsers() {
  const usersTableBody = document.getElementById("usersTableBody") as HTMLTableSectionElement;
  
  if (users.length === 0) {
    usersTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="px-4 py-8 text-center text-gray-500 italic">
          No users created yet. Click "Create New User" to add one.
        </td>
      </tr>
    `;
    return;
  }
  
  usersTableBody.innerHTML = users.map(user => `
    <tr class="hover:bg-gray-50">
      <td class="px-4 py-3 text-sm text-gray-900">${user.id}</td>
      <td class="px-4 py-3 text-sm font-medium text-gray-900">${user.username}</td>
      <td class="px-4 py-3 text-sm text-gray-600">${user.email}</td>
      <td class="px-4 py-3 text-sm">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.role === 'admin' ? 'bg-red-100 text-red-800' : 
          user.role === 'user' ? 'bg-blue-100 text-blue-800' : 
          'bg-gray-100 text-gray-800'
        }">
          ${user.role}
        </span>
      </td>
      <td class="px-4 py-3 text-sm">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }">
          ${user.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
    </tr>
  `).join('');
}

function showForm() {
  createUserForm.classList.remove('hidden');
  toggleFormBtn.textContent = 'Hide Form';
}

function hideForm() {
  createUserForm.classList.add('hidden');
  toggleFormBtn.textContent = 'Create New User';
  form.reset();

  const resultDiv = document.getElementById("result") as HTMLDivElement;
  resultDiv.innerHTML = '';
}

toggleFormBtn.addEventListener('click', () => {
  if (createUserForm.classList.contains('hidden')) {
    showForm();
  } else {
    hideForm();
  }
});

closeFormBtn.addEventListener('click', hideForm);
cancelBtn.addEventListener('click', hideForm);

form.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  
  const username = (form.elements.namedItem("username") as HTMLInputElement).value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const role = roleSelect.value as 'admin' | 'user' | 'guest';
  
  const minPasswordLength = role === 'admin' ? 12 : 8;
  if (password.length < minPasswordLength) {
    const resultDiv = document.getElementById("result") as HTMLDivElement;
    resultDiv.innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-md p-4">
        <p class="text-red-800">${role === 'admin' ? 'Admin' : 'User'} password must be at least ${minPasswordLength} characters!</p>
      </div>
    `;
    return;
  }
  
  const newUser: Partial<User> = {
    username: username,
    email: email,
    role: role,
    isActive: true
  };
  
  const createdUser = createUser(newUser);
  
  users.push(createdUser);
  
  console.log('Created user:', createdUser);
  
  const resultDiv = document.getElementById("result") as HTMLDivElement;
  resultDiv.innerHTML = `
    <div class="bg-green-50 border border-green-200 rounded-md p-4">
      <h3 class="text-lg font-semibold text-green-800 mb-2">User Created Successfully!</h3>
      <div class="space-y-1 text-sm text-green-700">
        <p class="font-medium">${formatUserInfo(createdUser)}</p>
        <p><span class="font-medium">ID:</span> ${createdUser.id}</p>
        <p><span class="font-medium">Active:</span> ${createdUser.isActive ? 'Yes' : 'No'}</p>
      </div>
    </div>
  `;
  
  displayUsers();
  
  form.reset();
};
