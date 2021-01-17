using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.Items
{
    /// <summary>
    /// Uses it to represent each item in the game
    /// </summary>
    public interface IItem
    {
        /// <summary>
        /// Id og the item
        /// </summary>
        int Id { get; set; }
    }
}
