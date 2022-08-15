using API.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        Task<string> Createtoken(AppUser user);
    }
}