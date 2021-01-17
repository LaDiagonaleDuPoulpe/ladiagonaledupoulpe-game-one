using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.Attacks
{
    /// <summary>
    /// Use this contract to use hit method
    /// </summary>
    public interface IWithDamage
    {
        /// <summary>
        /// Hits the health, and substract the damage value to the current health value
        /// </summary>
        /// <param name="damageValue">Damage value, must be more than 0</param>
        void Hit(int damageValue);
    }
}
